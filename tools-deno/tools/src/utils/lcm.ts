import { primeFactorize, type PrimeFactorsCount } from "./prime_factorize.ts";
import { not } from "./not.ts";

const mergePrimeFactors = (
  primeFactorsCount1: PrimeFactorsCount,
  primeFactorsCount2: PrimeFactorsCount,
): PrimeFactorsCount => {
  const mergedPrimeFactors: PrimeFactorsCount = {};
  const combinedPrimes = Array.from(
    new Set([
      ...Object.keys(primeFactorsCount1),
      ...Object.keys(primeFactorsCount2),
    ]),
  );
  combinedPrimes.forEach((primeAsString) => {
    const prime = parseInt(primeAsString, 10);
    mergedPrimeFactors[prime] = Math.max(
      primeFactorsCount1[prime] ?? 0,
      primeFactorsCount2[prime] ?? 0,
    );
  });
  return mergedPrimeFactors;
};

/**
 * Calculate the least common multiple of numbers
 *
 * @param numbers - List of numbers to find the lcm of
 */
export function lcm(...numbers: number[]): number {
  // Validate each number to be a non-negative integer
  numbers.forEach((n) => {
    if (n < 0 || not(Number.isInteger(n))) {
      throw new Error(`Expected "n" to be a positive integer, found "${n}"`);
    }
  });

  // Container to hold the prime factors of the lcm
  let lcmPrimeFactorsCount: PrimeFactorsCount = {};

  // For each number, merge its prime factors with lcm
  numbers.forEach((n) => {
    lcmPrimeFactorsCount = mergePrimeFactors(
      lcmPrimeFactorsCount,
      primeFactorize(n),
    );
  });

  // Reduce the prime factors of lcm to the actual value
  return Object.keys(lcmPrimeFactorsCount).reduce((lcmValue, primeAsString) => {
    const primeNumber = parseInt(primeAsString, 10);
    return lcmValue * primeNumber ** lcmPrimeFactorsCount[primeNumber];
  }, 1);
}
