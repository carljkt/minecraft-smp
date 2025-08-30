import { Client } from '../client/index.js';
import { Player } from '../types/Minecraft.js';

export class AllowlistMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get the players list
	 *
	 * @returns {Player[]} list of players
	 */
	async get(): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:allowlist');
	}

	/**
	 * Set the allowlist to the provided list of players
	 *
	 * @param {Player[]} players
	 * @returns {Player[]} players
	 */
	async set(players: Player[]): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:allowlist/set', [players]);
	}

	/**
	 * Add players to the allowlist
	 *
	 * @param players
	 * @returns
	 */
	async add(players: Player[]): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:allowlist/add', [players]);
	}

	/**
	 * Remove players from allowlist
	 *
	 * @param players
	 * @returns
	 */
	async remove(players: Player[]): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:allowlist/remove', [players]);
	}

	/**
	 * Clear all players in allowlist
	 *
	 * @returns
	 */
	async clear() {
		return this.client.request('minecraft:allowlist/clear');
	}
}
