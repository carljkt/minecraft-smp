import { validate } from '../utils/validation.js';
import { Client } from '../client/index.js';
import { IncomingUserBan, UserBan, PlayerInput } from '../types/Minecraft.js';
import { multipleIncomingPlayerBanSchema, multiplePlayerInputSchema } from '../schemas/playerSchema.js';

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
	 * @param {IncomingUserBan[]} bans
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {UserBan[]} updated ban list
	 */
	async set(bans: IncomingUserBan[], validationOverride: boolean = false): Promise<UserBan[]> {
		validate(multipleIncomingPlayerBanSchema, bans, validationOverride);

		const normalizedBans: UserBan[] = bans.map((ban) => ({
			...ban,
			expires: ban.expires ? ban.expires.toISOString() : undefined,
		})) as UserBan[];

		return this.client.request<UserBan[]>('minecraft:bans/set', [normalizedBans]);
	}

	/**
	 * Add players to the ban list
	 *
	 * @param {IncomingUserBan[]} bans
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {UserBan[]} updated ban list
	 */
	async add(bans: IncomingUserBan[], validationOverride: boolean = false): Promise<UserBan[]> {
		validate(multipleIncomingPlayerBanSchema, bans, validationOverride);

		const normalizedBans: UserBan[] = bans.map((ban) => ({
			...ban,
			expires: ban.expires ? ban.expires.toISOString() : undefined,
		})) as UserBan[];

		return this.client.request<UserBan[]>('minecraft:bans/add', [normalizedBans]);
	}

	/**
	 * Remove players from the ban list
	 *
	 * @param {PlayerInput[]} players
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {UserBan[]} updated ban list
	 */
	async remove(players: PlayerInput[], validationOverride: boolean = false): Promise<UserBan[]> {
		validate(multiplePlayerInputSchema, players, validationOverride);

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
