import { describe, expect, it } from 'vitest';
import { sieveOfEratosthenes } from './sieveOfEratosthenes';

describe('Math > Numbers > Primes > Sieves > Sieve of Eratosthenes tests', () => {
  it('should return empty array if limit is negative number', () => {
    expect(sieveOfEratosthenes(-10)).toStrictEqual([]);
  });

  it('should return correct list of primes for a non-prime limit', () => {
    expect(sieveOfEratosthenes(10)).toStrictEqual([2, 3, 5, 7]);
  });

  it('should return correct list of primes for a prime limit', () => {
    expect(sieveOfEratosthenes(13)).toStrictEqual([2, 3, 5, 7, 11, 13]);
  });
});
