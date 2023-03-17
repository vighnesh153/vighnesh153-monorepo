import { describe, expect, it, test } from 'vitest';
import { nthPrime } from './nthPrime';

describe('Math > Numbers > Primes > nthPrime tests', () => {
  it('should throw error if n is not positive integer', () => {
    expect(() => nthPrime(-2)).toThrowErrorMatchingInlineSnapshot();
    expect(() => nthPrime(5.5)).toThrowErrorMatchingInlineSnapshot();
  });

  test.each([
    [1, 2],
    [4, 7],
    [10, 29],
  ])('nthPrime(%j) equals %j', (n, expected) => {
    expect(nthPrime(n)).toBe(expected);
  });
});
