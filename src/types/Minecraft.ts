// Core Types

export interface Player {
	name: string;
	id: string;
}

export interface Message {
	translatable: string;
	translatableParams: string[];
	literal: string;
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

export interface IncomingIPBan extends IPBan {
	player: Player;
}

export interface UserBan {
	reason: string;
	expires: string;
	source: string;
	player: Player;
}

// System & Actions

export interface SystemMessage {
	receivingPlayers: Player[];
	overlay: boolean;
	message: Message;
}

export interface KickPlayer {
	players: Player[];
	message: Message;
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
