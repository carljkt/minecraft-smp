import { Client } from '../client/index.js';
import { Player, UserBan } from '../types/Minecraft.js';

export class BansMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get the ban list
	 *
	 * @returns {UserBan[]} list of banned users
	 */
	async get(): Promise<UserBan[]> {
		return this.client.request<UserBan[]>('minecraft:bans');
	}

	/**
	 * Set the banlist to the provided list of user bans
	 *
	 * @param {UserBan[]} bans
	 * @returns {UserBan[]} updated ban list
	 */
	async set(bans: UserBan[]): Promise<UserBan[]> {
		return this.client.request<UserBan[]>('minecraft:bans/set', [bans]);
	}

	/**
	 * Add players to the ban list
	 *
	 * @param {UserBan[]} bans
	 * @returns {UserBan[]} updated ban list
	 */
	async add(bans: UserBan[]): Promise<UserBan[]> {
		return this.client.request<UserBan[]>('minecraft:bans/add', [bans]);
	}

	/**
	 * Remove players from the ban list
	 *
	 * @param {Player[]} players
	 * @returns {UserBan[]} updated ban list
	 */
	async remove(players: Player[]): Promise<UserBan[]> {
		return this.client.request<UserBan[]>('minecraft:bans/remove', [players]);
	}

	/**
	 * Clear all players in the ban list
	 *
	 * @returns {UserBan[]} updated ban list (empty)
	 */
	async clear(): Promise<UserBan[]> {
		return this.client.request<UserBan[]>('minecraft:bans/clear');
	}
}
