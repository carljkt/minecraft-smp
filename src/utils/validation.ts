import { z } from 'zod';

/**
 * Represents a validation failure.
 */
export class ValidationError extends Error {
	override readonly cause: z.ZodError;

	constructor(error: z.ZodError) {
		super(z.prettifyError(error));

		this.name = new.target.name;
		this.cause = error;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, new.target);
		}
	}
}

/**
 * Parses a value using the provided validator, respecting validation settings.
 *
 * @param validator - The Zod schema used for validation
 * @param value - The value to be parsed
 * @param validationOverride - Explicitly enable or disable validation
 * @returns The parsed result
 */
export function validate<T extends z.ZodType>(
	validator: T,
	value: unknown,
	validationOverride: boolean = false,
): z.output<T> {
	if (validationOverride === false) {
		const result = validator.safeParse(value);

		if (!result.success) {
			throw new ValidationError(result.error);
		}

		return result.data;
	}

	return value as z.output<T>;
}
