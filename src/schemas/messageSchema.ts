import { Message } from '../types/index.js';
import { z } from 'zod';

export const messageSchema = z.object({
	literal: z.string().optional(),
	translatable: z.string().optional(),
	translatableParams: z.array(z.string()).optional(),
}) satisfies z.ZodType<Message>;
