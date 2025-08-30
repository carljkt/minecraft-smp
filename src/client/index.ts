import { EventEmitter } from 'eventemitter3';
import {
	AllowlistMethods,
	BansMethods,
	GameRulesMethods,
	IPBansMethods,
	PlayersMethods,
	ServerMethods,
	ServerSettingsMethods,
} from '../methods/index.js';
import { NotificationEventParams } from '../types/Notification.js';
import { JsonRpcRequest, JsonRpcResponse, JsonRpcNotification, JsonRpcMessage } from '../types/JsonRpc.js';
import { ConnectionState } from './enums.js';

export * from './enums.js';

// Client configuration
export interface ClientOptions {
	protocols: string[];
	autoReconnect: boolean;
	reconnectInterval: number;
	maxReconnectAttempts: number;
	requestTimeout: number;
	WebSocketImpl: typeof WebSocket;
}

export interface PendingRequest {
	resolve: (value: unknown) => void;
	reject: (error: Error) => void;
	timeout: ReturnType<typeof setTimeout>;
}

async function getWebSocketImpl(): Promise<typeof WebSocket> {
	if (typeof WebSocket !== 'undefined') {
		return WebSocket;
	}

	const ws = await import('ws');

	return ws.default as unknown as typeof WebSocket;
}

/**
 * Client for Server Management Protocol
 *
 * @example
 * const client = new Client('ws://localhost:25585', {
 * 	 autoReconnect: true,
 *   reconnectInterval: 5_000,
 *   maxReconnectAttempts: 5,
 *   requestTimeout: 10_000
 * });
 *
 * // Event listeners
 * client.on('connected', () => console.log('Connected to server'));
 * client.on('disconnected', (code, reason) => console.log('Disconnected:', code, reason));
 *
 */
export class Client extends EventEmitter {
	private ws: WebSocket | null = null;
	private url: string;
	private protocols: string[];
	private autoReconnect: boolean;
	private reconnectInterval: number;
	private maxReconnectAttempts: number;
	private requestTimeout: number;
	private reconnectAttempts = 0;
	private isConnecting = false;
	private pendingRequests = new Map<string | number, PendingRequest>();
	private requestId = 0;
	private initPromise: Promise<void> | null = null;
	private WebSocketImpl: typeof WebSocket | null = null;

	// Methods
	public Players = new PlayersMethods(this);
	public Server = new ServerMethods(this);
	public Allowlist = new AllowlistMethods(this);
	public Bans = new BansMethods(this);
	public GameRules = new GameRulesMethods(this);
	public IPBans = new IPBansMethods(this);
	public ServerSettings = new ServerSettingsMethods(this);

	constructor(url: string, options?: Partial<ClientOptions>) {
		super();

		this.url = url;
		this.protocols = options?.protocols || [];
		this.autoReconnect = options?.autoReconnect || false;
		this.reconnectInterval = options?.reconnectInterval || 5_000;
		this.maxReconnectAttempts = options?.maxReconnectAttempts || 10;
		this.requestTimeout = options?.requestTimeout || 30_000;

		this.initPromise = this.initialize(options);
	}

	private async initialize(options?: Partial<ClientOptions>): Promise<void> {
		this.WebSocketImpl = options?.WebSocketImpl || (await getWebSocketImpl());
	}

	/**
	 * Connect to WebSocket server
	 */
	public async connect(): Promise<void> {
		if (this.initPromise) {
			await this.initPromise;
			this.initPromise = null;
		}

		if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
			return;
		}

		this.isConnecting = true;

		return new Promise((resolve, reject) => {
			try {
				this.ws = new WebSocket(this.url, this.protocols);

				this.ws.onopen = () => {
					this.isConnecting = false;
					this.reconnectAttempts = 0;
					this.emit('connected');
					resolve();
				};

				this.ws.onmessage = (event) => {
					this.handleMessage(event.data);
				};

				this.ws.onclose = (event) => {
					this.isConnecting = false;
					this.emit('disconnected', event.code, event.reason);
					if (this.autoReconnect) {
						this.handleReconnect();
					}
				};

				this.ws.onerror = (error) => {
					this.isConnecting = false;
					this.emit('error', error);
					reject(new Error('WebSocket connection failed'));
				};
			} catch (error) {
				this.isConnecting = false;
				reject(error);
			}
		});
	}

	/**
	 * Disconnect from WebSocket server
	 */
	public disconnect(): void {
		if (this.ws) {
			this.ws.close(1000, 'Client disconnecting');
			this.ws = null;
		}

		// Reject all pending requests
		this.pendingRequests.forEach((request) => {
			clearTimeout(request.timeout);
			request.reject(new Error('Connection closed'));
		});
		this.pendingRequests.clear();
	}

	// Handle incoming messages
	private handleMessage(data: string): void {
		try {
			const message: JsonRpcMessage = JSON.parse(data);

			// Handle method response
			if ('result' in message || 'error' in message) {
				this.handleResponse(message as JsonRpcResponse);
			}
			// Handle notification
			else if ('method' in message && !('id' in message)) {
				this.handleNotification(message as JsonRpcNotification);
			}
		} catch (error) {
			this.emit('error', new Error(`Failed to parse JSON-RPC message: ${error}`));
		}
	}

	// Handle JSON-RPC response
	private handleResponse(response: JsonRpcResponse): void {
		const { id, result, error } = response;

		if (id === null || id === undefined) {
			return;
		}

		const pendingRequest = this.pendingRequests.get(id);
		if (!pendingRequest) {
			return;
		}

		this.pendingRequests.delete(id);
		clearTimeout(pendingRequest.timeout);

		if (error) {
			const rpcError = new Error(`JSON-RPC Error ${error.code}: ${error.message}`);
			pendingRequest.reject(rpcError);
		} else {
			pendingRequest.resolve(result);
		}
	}

	// Handle JSON-RPC notification
	private handleNotification(notification: JsonRpcNotification): void {
		this.emit('notification', notification.method, notification.params);

		if (Array.isArray(notification.params)) {
			this.emit(`${notification.method}`, ...notification.params);
		} else if (notification.params !== undefined) {
			this.emit(`${notification.method}`, notification.params);
		} else {
			this.emit(`${notification.method}`);
		}
	}

	// Handle reconnection logic
	private handleReconnect(): void {
		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			this.emit('maxReconnectAttemptsReached');
			return;
		}

		this.reconnectAttempts++;
		this.emit('reconnecting', this.reconnectAttempts);

		setTimeout(() => {
			this.connect().catch((error) => {
				this.emit('reconnectFailed', error);
			});
		}, this.reconnectInterval);
	}

	/**
	 * Send JSON-RPC request with response
	 *
	 * @param {string} method - request method
	 * @param {unknown[]} params - params of the method
	 * @returns response
	 *
	 * @example
	 * ```ts
	 *
	 * const players = await this.client.Players.get();
	 *
	 * this.client.request<Player[]>('minecraft:allowlist/set', [players]);
	 * ```
	 */
	public async request<T = unknown>(method: string, params?: unknown[] | Record<string, unknown>): Promise<T> {
		if (!this.isConnected()) {
			throw new Error('WebSocket is not connected');
		}

		const id = ++this.requestId;
		const request: JsonRpcRequest = {
			jsonrpc: '2.0',
			method,
			params,
			id,
		};

		return new Promise<T>((resolve, reject) => {
			// Set up timeout
			const timeout = setTimeout(() => {
				this.pendingRequests.delete(id);
				reject(new Error(`Request timeout for method: ${method}`));
			}, this.requestTimeout);

			// Store pending request
			this.pendingRequests.set(id, { resolve, reject, timeout });

			// Send request
			this.send(request);
		});
	}

	/**
	 * Registers a listener for a specific notification event.
	 *
	 * @template K - The notification event key from {@link NotificationEventParams}.
	 * @param event - The notification event name to listen for.
	 * @param listener - The callback function invoked with the event parameters.
	 * @returns The client instance for chaining.
	 *
	 * @example
	 * client.onNotification('notification:players/joined', (player) => {
	 *   console.log(`${player.name} joined the server`);
	 * });
	 */
	public onNotification<K extends keyof NotificationEventParams>(
		event: K,
		listener: (...args: NotificationEventParams[K]) => void,
	): this {
		return super.on(event, listener);
	}

	/**
	 * Send raw JSON-RPC message
	 *
	 * @param {JsonRpcMessage} message - the message to send
	 * @example
	 * ```ts
	 * this.ws.send(JSON.stringify({"id":1,"method":"rpc.discover"}))
	 * ```
	 */
	private send(message: JsonRpcMessage): void {
		if (this.ws.readyState !== WebSocket.OPEN) {
			throw new Error('WebSocket is not open');
		}

		this.ws.send(JSON.stringify(message));
		this.emit('messageSent', message);
	}

	/**
	 * Check if websocket is connected
	 *
	 * @returns {boolean} whether the websocket is connected
	 */
	public isConnected(): boolean {
		return this.ws.readyState === WebSocket.OPEN;
	}

	/**
	 * Get Connection State
	 *
	 * @returns {ConnectionState} the connection state
	 */
	public getState(): ConnectionState {
		if (!this.ws) return ConnectionState.CLOSED;

		switch (this.ws.readyState) {
			case WebSocket.CONNECTING:
				return ConnectionState.CONNECTING;
			case WebSocket.OPEN:
				return ConnectionState.OPEN;
			case WebSocket.CLOSING:
				return ConnectionState.CLOSING;
			case WebSocket.CLOSED:
				return ConnectionState.CLOSED;
		}
	}
}
