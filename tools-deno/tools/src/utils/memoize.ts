import { not } from "./not.ts";

/**
 * Memoizes any function and returns the cached value for
 * subsequent invocations.
 *
 * @param fn - Function to be memoized
 * @param serializeArgs - Serializes the function arguments so that it can be
 * used as a cache key
 */
export function memoize<T extends Array<unknown>, U>(
  fn: (...args: T) => U,
  serializeArgs = (...args: T): string | number | boolean =>
    JSON.stringify(args),
): (...args: T) => U {
  // Cache to hold all the values
  const memo = new Map<string | number | boolean, U>();

  return (...args: T): U => {
    // Maps the args to a key to be used as an identifier
    const key = serializeArgs(...args);

    // If memo doesn't have the cache for the key, invoke
    // the "fn", and store the value in cache
    if (not(memo.has(key))) {
      memo.set(key, fn(...args));
    }

    // Return the cached value
    return memo.get(key) as U;
  };
}
