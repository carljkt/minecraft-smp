import { GameRules } from '../constants/GameRules.js';
import { Client } from '../client/index.js';
import { TypedGameRule } from '../types/Minecraft.js';

type GameRuleType = (typeof GameRules)[keyof typeof GameRules];

type RuleValue<T extends GameRuleType> = T extends 'boolean' ? boolean : T extends 'integer' ? number : string;

type KnownGameRuleKey = keyof typeof GameRules;

type KnownUpdate<K extends KnownGameRuleKey> = {
	[P in K]: RuleValue<(typeof GameRules)[K]>;
};

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
	 * Update a game rule value.
	 *
	 * @template K - A known game rule key
	 * @param {KnownUpdate<K>} gamerule - A known game rule update (typed)
	 * @returns {Promise<TypedGameRule>} The updated game rule with its typed value
	 */
	async update<K extends KnownGameRuleKey>(gamerule: KnownUpdate<K>): Promise<TypedGameRule> {
		const [key, value] = Object.entries(gamerule)[0] as [K, RuleValue<(typeof GameRules)[K]>];

		const normalized = {
			key,
			value: typeof value === 'string' ? value : String(value),
		};

		return this.client.request<TypedGameRule>('minecraft:gamerules/update', [normalized]);
	}
}
