import { Message } from '@/types/Minecraft.js';
import { MessageBuilder } from './MessageBuilder.js';

export function normalizeMessage(msg: MessageBuilder | Message): Message {
	return msg instanceof MessageBuilder ? msg.toJSON() : msg;
}
