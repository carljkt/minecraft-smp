// Core Types

import { RequireAtLeastOne } from './index.js';

export interface Player {
	name: string;
	id: string;
}

/**
 * Represents flexible input for a player.
 *
 * This type allows an object with:
 * - only `id`
 * - only `name`
 * - or both `id` and `name`
 *
 * It is based on the {@link Player} type but enforces that
 * at least one of the two keys (`id` or `name`) is required.
 *
 * @example
 * // Valid
 * const a: PlayerInput = { id: "123" };
 * const b: PlayerInput = { name: "Alice" };
 * const c: PlayerInput = { id: "123", name: "Alice" };
 *
 * // Invalid (must have at least one of id or name)
 * const d: PlayerInput = {};
 */
export type PlayerInput = RequireAtLeastOne<Player, 'id' | 'name'>;

export interface Message {
	translatable?: string;
	translatableParams?: string[];
	literal?: string;
}

export interface Version {
	protocol: number;
	name: string;
}

// Game Rules

export interface UntypedGameRule {
	value: string;
	key: string;
}

export type GameRuleType = 'integer' | 'boolean';

export interface TypedGameRule {
	type: GameRuleType;
	value: string;
	key: string;
}

// Bans

export interface IPBan {
	reason: string;
	expires: string;
	ip: string;
	source: string;
}

export interface IncomingIPBan {
	player?: PlayerInput;
	reason?: string;
	expires?: Date;
	ip?: string;
	source?: string;
}

export interface UserBan {
	reason: string;
	expires: string;
	source: string;
	player: Player;
}

export interface IncomingUserBan {
	reason?: string;
	expires?: Date;
	source?: string;
	player: PlayerInput;
}

// System & Actions

export interface SystemMessage {
	receivingPlayers: PlayerInput[];
	overlay: boolean;
	message: Message;
}

export interface IncomingPlayerKick {
	players: PlayerInput[];
	message?: Message;
}

// Server State & Operators

export interface ServerState {
	players: Player[];
	started: boolean;
	version: Version;
}

export interface Operator {
	permissionLevel: number;
	bypassesPlayerLimit: boolean;
	player: Player;
}
