import { z } from 'zod';
import { Player } from '../types/Minecraft.js';
import { messageSchema } from './messageSchema.js';

export const playerNameSchema = z
	.string()
	.min(3, 'Must be at least 3 characters')
	.max(16, 'Must be at most 16 characters')
	.regex(/^[A-Za-z0-9_]+$/, 'Only letters, numbers, and underscore are allowed');

export const playerSchema = z.object({
	name: playerNameSchema,
	id: z.uuid(),
}) satisfies z.ZodType<Player>;

export const playerInputSchema = z
	.object({
		name: playerNameSchema.optional(),
		id: z.uuid().optional(),
	})
	.refine((data) => data.name !== undefined || data.id !== undefined, {
		message: 'Must provide at least player name or player id',
		path: ['name', 'id'],
	});

export const multiplePlayerInputSchema = z.array(playerInputSchema).min(1, 'Players must contain at least one player');

export const incomingPlayerKickSchema = z.object({
	players: z.array(playerInputSchema).min(1, 'players must contain at least one player'),
	message: messageSchema.optional(),
});

export const incomingPlayerBanSchema = z.object({
	player: playerInputSchema,
	reason: z.string().optional(),
	expires: z
		.date()
		.optional()
		.refine((date) => !date || date > new Date(), {
			message: 'expires must be greater than now',
		}),
	source: z.string().optional(),
});

export const multipleIncomingPlayerBanSchema = z
	.array(incomingPlayerBanSchema)
	.min(1, 'Players must contain at least one player');
