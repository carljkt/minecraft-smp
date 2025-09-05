export * from './JsonRpc.js';
export * from './Notification.js';
export * from './Minecraft.js';

/**
 * Utility type that enforces that at least one of the specified keys must exist in a type.
 *
 * @template T - The base type.
 * @template Keys - A subset of keys from T. At least one of these keys is required.
 *
 * @example
 * interface Example {
 *   foo?: string;
 *   bar?: number;
 *   baz?: boolean;
 * }
 *
 * type AtLeastOne = RequireAtLeastOne<Example, "foo" | "bar">;
 *
 * // Valid
 * const a: AtLeastOne = { foo: "hello" };
 * const b: AtLeastOne = { bar: 123 };
 * const c: AtLeastOne = { foo: "hi", bar: 456, baz: true };
 *
 * // Invalid (requires at least foo or bar)
 * const d: AtLeastOne = { baz: true };
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];
