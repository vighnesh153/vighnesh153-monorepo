import { primeFactorize, PrimeFactorsCount } from '../primeFactorize';
import { not } from '../not';

// Find the intersection between 2 PrimeFactors objects
const primeFactorsIntersection = (
  primeFactorsCount1: PrimeFactorsCount | null,
  primeFactorsCount2: PrimeFactorsCount
): PrimeFactorsCount => {
  if (primeFactorsCount1 === null) return primeFactorsCount2;

  const intersection: PrimeFactorsCount = {};

  Object.keys(primeFactorsCount1).forEach((key) => {
    const prime = key as unknown as keyof PrimeFactorsCount;
    const factors1 = primeFactorsCount1[prime] ?? 0;
    const factors2 = primeFactorsCount2[prime] ?? 0;
    intersection[prime] = Math.min(factors1, factors2);
  });

  return intersection;
};

/**
 * Calculate the greatest common divisor of numbers
 *
 * @param numbers - List of numbers to find the gcd of
 */
export function gcd(...numbers: number[]): number {
  // Validate each number to be a non-negative integer
  numbers.forEach((n) => {
    if (n < 0 || not(Number.isInteger(n))) {
      throw new Error(`Expected "n" to be a positive integer, found "${n}"`);
    }
  });

  // Container to hold the prime factors of the gcd
  let gcdPrimeFactors: PrimeFactorsCount | null = null;

  // For each number, find the common prime factors with gcd
  numbers.forEach((n) => {
    gcdPrimeFactors = primeFactorsIntersection(gcdPrimeFactors, primeFactorize(n));
  });

  if (gcdPrimeFactors === null) {
    return 1;
  }

  // Reduce the prime factors of gcd to the actual value
  return Object.keys(gcdPrimeFactors).reduce((gcdValue, primeNumAsString) => {
    const primeNumber = parseInt(primeNumAsString, 10);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return gcdValue * primeNumber ** gcdPrimeFactors![primeNumber];
  }, 1);
}
