import { z } from 'zod';
import { playerInputSchema } from './playerSchema.js';

export const ipSchema = z.union([z.ipv4(), z.ipv6()]);

export const multipleIPSchema = z.array(ipSchema).min(1, 'IPs must contain at least one IP address');

export const ipBanSchema = z.object({
	ip: ipSchema,
	reason: z.string().optional(),
	expires: z
		.date()
		.optional()
		.refine((date) => !date || date > new Date(), {
			message: 'expires must be greater than now',
		}),
	source: z.string().optional(),
});

export const multipleIPBanSchema = z.array(ipBanSchema).min(1, 'IP Bans must contain at least one IP address');

export const incomingIPBanSchema = ipBanSchema
	.extend({ player: playerInputSchema.optional(), ip: ipSchema.optional() })
	.refine((data) => data.player !== undefined || data.ip !== undefined, {
		message: 'Must provide at least a player or IP address',
		path: ['player', 'ip'],
	});

export const multipleIncomingIPBanSchema = z
	.array(incomingIPBanSchema)
	.min(1, 'Incoming IP Bans must contain at least one player or IP address');
