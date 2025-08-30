import { Client } from '../client/index.js';
import { ServerState, SystemMessage } from '../types/Minecraft.js';

export class ServerMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get the server status
	 *
	 * @returns {ServerState[]} list of server states
	 */
	async status(): Promise<ServerState[]> {
		return this.client.request<ServerState[]>('minecraft:server/status');
	}

	/**
	 * Save the server state
	 *
	 * @param {boolean} flush - whether to flush before saving
	 * @returns {boolean} saving status
	 */
	async save(flush: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:server/save', [flush]);
	}

	/**
	 * Stop the server
	 *
	 * @returns {boolean} whether the server is stopping
	 */
	async stop(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:server/stop');
	}

	/**
	 * Send a system message
	 *
	 * @param {SystemMessage} message - system message to send
	 * @returns {boolean} whether the message was sent
	 */
	async sendSystemMessage(message: SystemMessage): Promise<boolean> {
		return this.client.request<boolean>('minecraft:server/system_message', [message]);
	}
}
