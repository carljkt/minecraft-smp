import { Colors, Formats } from '@/constants/Message.js';
import { Message } from '@/types/index.js';

export class MessageBuilder {
	private _translatable?: string;
	private _translatableParams?: string[];
	private _literalParts: string[] = [];

	private nextPrefix = '';

	/**
	 * Sets a translatable message with optional color/formatting.
	 */
	public setTranslatable(
		key: string,
		params?: string[],
		options?: { color?: keyof typeof Colors; formats?: Array<keyof typeof Formats> },
	): this {
		let prefix = this.nextPrefix;

		if (options?.color) {
			prefix += Colors[options.color];
		}
		if (options?.formats) {
			for (const format of options.formats) {
				prefix += Formats[format];
			}
		}

		this._translatable = prefix + key;

		this._translatableParams = (params ?? []).map((p) => prefix + p);

		this.nextPrefix = ''; // reset after use
		return this;
	}

	/**
	 * Adds a literal piece of text, with optional color/formatting.
	 */
	public addText(text: string, options?: { color?: keyof typeof Colors; formats?: Array<keyof typeof Formats> }): this {
		let prefix = this.nextPrefix;

		if (options?.color) {
			prefix += Colors[options.color];
		}
		if (options?.formats) {
			for (const format of options.formats) {
				prefix += Formats[format];
			}
		}

		this._literalParts.push(prefix + text);
		this.nextPrefix = ''; // reset after use
		return this;
	}

	/**
	 * Sets the color for the next text (chaining style).
	 */
	public setColor(color: keyof typeof Colors): this {
		this.nextPrefix += Colors[color];
		return this;
	}

	/**
	 * Adds formatting for the next text (chaining style).
	 * Multiple calls stack correctly.
	 */
	public setFormat(format: keyof typeof Formats): this {
		this.nextPrefix += Formats[format];
		return this;
	}

	/**
	 * Explicit reset for the next text.
	 */
	public resetFormat(): this {
		this.nextPrefix = Formats.Reset;
		return this;
	}

	/**
	 * Builds and returns the final Message object.
	 */
	public toJSON(): Message {
		const result: Message = {};
		if (this._translatable) result.translatable = this._translatable;
		if (this._translatableParams?.length) result.translatableParams = this._translatableParams;
		if (this._literalParts.length) result.literal = this._literalParts.join('');
		return result;
	}

	/**
	 * Converts the built message into a MOTD-friendly string.
	 * (Replaces `§` with `\u00A7`)
	 */
	public toMotd(): string {
		const json = this.toJSON();
		if (!json.literal) {
			return ''; // MOTD only supports text (not translatable directly)
		}
		return json.literal.replace(/§/g, '\u00A7');
	}
}
