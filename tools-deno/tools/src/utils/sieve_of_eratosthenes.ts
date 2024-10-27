/**
 * Generates all the primes before "limit" (inclusive)
 *
 * @param n - upper limit for generating primes
 */
export function sieveOfEratosthenes(n: number): number[] {
  if (n < 0) return [];

  const isIndexPrime = Array.from({ length: n + 1 }).map(() => true);
  isIndexPrime[0] = false;
  isIndexPrime[1] = false;

  // Algorithm: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Algorithm_and_variants
  for (let index = 0; index <= n; index += 1) {
    if (isIndexPrime[index]) {
      for (
        let multipleOfIndex = index * 2;
        multipleOfIndex <= n;
        multipleOfIndex += index
      ) {
        isIndexPrime[multipleOfIndex] = false;
      }
    }
  }

  return isIndexPrime
    .map((isPrime, index) => ({ isPrime, number: index }))
    .filter(({ isPrime }) => isPrime)
    .map(({ number }) => number);
}
