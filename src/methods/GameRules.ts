import { GameRules } from '../constants/GameRules.js';
import { Client } from '../client/index.js';
import { GameRuleType, TypedGameRule, UntypedGameRule } from '../types/Minecraft.js';

type KnownGameRule = (typeof GameRules)[number];

type RuleValue<T extends GameRuleType> = T extends 'boolean' ? boolean : T extends 'integer' ? number : string;

type KnownUpdate<K extends KnownGameRule> = {
	key: K['key'];
	value: RuleValue<K['type']>;
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
	 * @param {UntypedGameRule} gamerule - An untyped game rule update
	 * @returns {Promise<TypedGameRule>} The updated game rule with its typed value
	 */
	async update<K extends KnownGameRule>(gamerule: KnownUpdate<K>): Promise<TypedGameRule>;
	async update(gamerule: UntypedGameRule): Promise<TypedGameRule>;
	async update(gamerule: UntypedGameRule): Promise<TypedGameRule> {
		const normalized: UntypedGameRule = {
			...gamerule,
			value: typeof gamerule.value === 'string' ? gamerule.value : String(gamerule.value),
		};

		return this.client.request<TypedGameRule>('minecraft:gamerules/update', [normalized]);
	}
}
