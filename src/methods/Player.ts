import { Client } from '../client/index.js';
import { KickPlayer, Player } from '../types/Minecraft.js';

export class PlayersMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get all connected players
	 *
	 * @returns {Player[]} list of connected players
	 */
	async get(): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:players');
	}

	/**
	 * Kick players
	 *
	 * @param {KickPlayer[]} players - players to kick
	 * @returns {Player[]} kicked players
	 */
	async kick(players: KickPlayer[]): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:players/kick', [players]);
	}
}
