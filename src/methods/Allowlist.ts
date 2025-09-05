import { validate } from '../utils/validation.js';
import { Client } from '../client/index.js';
import { Player, PlayerInput } from '../types/Minecraft.js';
import { multiplePlayerInputSchema } from '../schemas/playerSchema.js';

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
	 * @param {PlayerInput[]} players
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns {Player[]} players
	 */
	async set(players: PlayerInput[], validationOverride: boolean = false): Promise<Player[]> {
		validate(multiplePlayerInputSchema, players, validationOverride);

		return this.client.request<Player[]>('minecraft:allowlist/set', [players]);
	}

	/**
	 * Add players to the allowlist
	 *
	 * @param players
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns
	 */
	async add(players: PlayerInput[], validationOverride: boolean = false): Promise<Player[]> {
		validate(multiplePlayerInputSchema, players, validationOverride);

		return this.client.request<Player[]>('minecraft:allowlist/add', [players]);
	}

	/**
	 * Remove players from allowlist
	 *
	 * @param players
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input. Default: `false`
	 * @returns
	 */
	async remove(players: PlayerInput[], validationOverride: boolean = false): Promise<Player[]> {
		validate(multiplePlayerInputSchema, players, validationOverride);

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
