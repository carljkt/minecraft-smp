import { Client } from '../client/index.js';
import { IPBan, IncomingIPBan } from '../types/Minecraft.js';

export class IPBansMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get the IP ban list
	 *
	 * @returns {IPBan[]} list of IP bans
	 */
	async get(): Promise<IPBan[]> {
		return this.client.request<IPBan[]>('minecraft:ip_bans');
	}

	/**
	 * Set the IP ban list
	 *
	 * @param {IPBan[]} bans
	 * @returns {IPBan[]} updated IP ban list
	 */
	async set(bans: IPBan[]): Promise<IPBan[]> {
		return this.client.request<IPBan[]>('minecraft:ip_bans/set', [bans]);
	}

	/**
	 * Add IPs to the ban list
	 *
	 * @param {IncomingIPBan[]} bans
	 * @returns {IPBan[]} updated IP ban list
	 */
	async add(bans: IncomingIPBan[]): Promise<IPBan[]> {
		return this.client.request<IPBan[]>('minecraft:ip_bans/add', [bans]);
	}

	/**
	 * Remove IPs from the ban list
	 *
	 * @param {string[]} ips
	 * @returns {IPBan[]} updated IP ban list
	 */
	async remove(ips: string[]): Promise<IPBan[]> {
		return this.client.request<IPBan[]>('minecraft:ip_bans/remove', [ips]);
	}

	/**
	 * Clear all IPs from the ban list
	 *
	 * @returns {IPBan[]} updated (empty) IP ban list
	 */
	async clear(): Promise<IPBan[]> {
		return this.client.request<IPBan[]>('minecraft:ip_bans/clear');
	}
}
