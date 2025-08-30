import { Client } from '../client/index.js';
import { TypedGameRule, UntypedGameRule } from '../types/Minecraft.js';

export class GameRulesMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get the available game rule keys and their current values
	 *
	 * @returns {TypedGameRule[]} list of game rules with current values
	 */
	async get(): Promise<TypedGameRule[]> {
		return this.client.request<TypedGameRule[]>('minecraft:gamerules');
	}

	/**
	 * Update a game rule value
	 *
	 * @param {UntypedGameRule} gamerule - the game rule to update
	 * @returns {TypedGameRule} the updated game rule with its typed value
	 */
	async update(gamerule: UntypedGameRule): Promise<TypedGameRule> {
		return this.client.request<TypedGameRule>('minecraft:gamerules/update', [gamerule]);
	}
}
