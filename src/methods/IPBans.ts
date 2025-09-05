import { RequireAtLeastOne } from '../types/index.js';
import { Client } from '../client/index.js';
import { IPBan, IncomingIPBan } from '../types/Minecraft.js';
import { multipleIncomingIPBanSchema, multipleIPBanSchema, multipleIPSchema } from '../schemas/ipBanSchema.js';
import { validate } from '../utils/validation.js';

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
	 * @param {IPBan[]} ipbans
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {IPBan[]} updated IP ban list
	 */
	async set(
		ipbans: RequireAtLeastOne<Omit<IncomingIPBan, 'player'>, 'ip'>[],
		validationOverride: boolean = false,
	): Promise<IPBan[]> {
		validate(multipleIPBanSchema, ipbans, validationOverride);

		const normalizedIPBans = ipbans.map((ban) => ({
			...ban,
			expires: ban.expires ? ban.expires.toISOString() : undefined,
		}));

		return this.client.request<IPBan[]>('minecraft:ip_bans/set', [normalizedIPBans]);
	}

	/**
	 * Add IPs to the ban list
	 *
	 * @param {IncomingIPBan[]} ipbans
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {IPBan[]} updated IP ban list
	 */
	async add(
		ipbans: RequireAtLeastOne<IncomingIPBan, 'ip' | 'player'>[],
		validationOverride: boolean = false,
	): Promise<IPBan[]> {
		validate(multipleIncomingIPBanSchema, ipbans, validationOverride);

		const normalizedIPBans = ipbans.map((ban) => ({
			...ban,
			expires: ban.expires ? ban.expires.toISOString() : undefined,
		}));

		return this.client.request<IPBan[]>('minecraft:ip_bans/add', [normalizedIPBans]);
	}

	/**
	 * Remove IPs from the ban list
	 *
	 * @param {string[]} ips
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {IPBan[]} updated IP ban list
	 */
	async remove(ips: string[], validationOverride: boolean = false): Promise<IPBan[]> {
		validate(multipleIPSchema, ips, validationOverride);

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
