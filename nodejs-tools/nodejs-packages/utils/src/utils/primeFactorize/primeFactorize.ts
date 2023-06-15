/**
 * Prime factors of a number as key-value pairs.
 *
 * key: prime,
 * value: count of occurrences
 */
export type PrimeFactorsCount = Record<number, number>;

/**
 * Factors the provided number into prime factors
 *
 * @param num - number to prime factorize
 */
export function primeFactorize(num: number): PrimeFactorsCount {
  let n = num;
  const primeFactorsCount: PrimeFactorsCount = {};

  let i = 2;
  while (i <= n) {
    if (n % i === 0) {
      primeFactorsCount[i] = (primeFactorsCount[i] ?? 0) + 1;
      n /= i;
    } else {
      i += 1;
    }
  }

  return primeFactorsCount;
}
