import { isPrime } from "./is_prime.ts";
import { not } from "./not.ts";

/**
 * Calculates the nth prime number.
 *
 * @param n - nth prime
 * @throws Will throw if n is not a positive integer
 */
export function nthPrime(n: number): number {
  if (n <= 0 || not(Number.isInteger(n))) {
    throw new Error('"n" needs to be a positive integer');
  }

  let count = 0;
  let nthPrimeValue = -1;

  for (let possiblePrime = 2;; possiblePrime += 1) {
    if (isPrime(possiblePrime)) {
      count += 1;
      if (count === n) {
        nthPrimeValue = possiblePrime;
        break;
      }
    }
  }

  return nthPrimeValue;
}
