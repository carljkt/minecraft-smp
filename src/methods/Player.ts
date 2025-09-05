import { validate } from '../utils/validation.js';
import { Client } from '../client/index.js';
import { IncomingPlayerKick, Message, Player } from '../types/Minecraft.js';
import { incomingPlayerKickSchema } from '../schemas/playerSchema.js';
import { normalizeMessage } from '../utils/normalize.js';
import { MessageBuilder } from '../utils/MessageBuilder.js';

export class PlayersMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get all connected players
	 *
	 * @returns {Player[]} list of connected players
	 */
	async get(): Promise<Player[]> {
		return this.client.request<Player[]>('minecraft:players');
	}

	/**
	 * Kick players
	 *
	 * @param {IncomingPlayerKick} incomingKick - The player(s) to kick with optional message.
	 * @param {boolean} [validationOverride=false] - Whether to skip validation and send raw input.
	 * @returns {Promise<Partial<Player>[]>} A promise resolving to the list of kicked players.
	 */
	async kick(
		incomingKick: IncomingPlayerKick & { message?: MessageBuilder | Message },
		validationOverride: boolean = false,
	): Promise<Partial<Player>[]> {
		validate(incomingPlayerKickSchema, incomingKick, validationOverride);

		const normalized: IncomingPlayerKick = {
			...incomingKick,
			message: normalizeMessage(incomingKick.message),
		};

		return this.client.request<Player[]>('minecraft:players/kick', [normalized]);
	}
}
