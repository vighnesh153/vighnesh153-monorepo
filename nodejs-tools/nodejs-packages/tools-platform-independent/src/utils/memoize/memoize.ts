import { not } from '../not';

/**
 * Memoizes any function and returns the cached value for
 * subsequent invocations.
 *
 * @param fn - Function to be memoized
 * @param getKey - Mapper that maps the input args of "fn"
 * to a unique key. This will be used as identifier for caching
 */
export function memoize<T extends Array<unknown>, U>(
  fn: (...args: T) => U,
  getKey = (...args: T): string | number | boolean => JSON.stringify(args)
) {
  // Cache to hold all the values
  const memo = new Map<string | number | boolean, U>();

  return (...args: T): U => {
    // Maps the args to a key to be used as an identifier
    const key = getKey(...args);

    // If memo doesn't have the cache for the key, invoke
    // the "fn", and store the value in cache
    if (not(memo.has(key))) {
      memo.set(key, fn(...args));
    }

    // Return the cached value
    return memo.get(key) as U;
  };
}
