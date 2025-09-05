import { MessageBuilder } from '../utils/MessageBuilder.js';
import { Client } from '../client/index.js';
import { Message, ServerState, SystemMessage } from '../types/Minecraft.js';
import { normalizeMessage } from '../utils/normalize.js';

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
	 * @param {SystemMessage} systemMessage - system message to send
	 * @returns {boolean} whether the message was sent
	 */
	async sendSystemMessage(systemMessage: SystemMessage & { message: MessageBuilder | Message }): Promise<boolean> {
		const normalized = {
			...systemMessage,
			message: normalizeMessage(systemMessage.message),
		};

		return this.client.request<boolean>('minecraft:server/system_message', [normalized]);
	}
}
