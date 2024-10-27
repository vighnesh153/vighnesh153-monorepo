import { isPrime } from "./is_prime.ts";

/**
 * Calculates the prime number occurring before "n"
 * @param n - Find prime number before "n"
 */
export function previousPrime(n: number): number | null {
  let current = Number.isInteger(n) ? n - 1 : Math.floor(n);
  while (current > 1) {
    if (isPrime(current)) return current;
    current -= 1;
  }
  return null;
}
