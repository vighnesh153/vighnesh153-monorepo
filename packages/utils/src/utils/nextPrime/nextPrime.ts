import { isPrime } from '../isPrime';

/**
 * Find the prime number occurring after "n"
 *
 * @param n - Find prime number after "n"
 */
export function nextPrime(n: number): number {
  let current = Number.isInteger(n) ? n + 1 : Math.ceil(n + 1);
  let nextPrimeValue = -1;
  while (current > 1) {
    if (isPrime(current)) {
      nextPrimeValue = current;
      break;
    }
    current += 1;
  }
  return nextPrimeValue;
}
