import { describe, expect, it } from 'vitest';
import { primeFactorize } from './primeFactorize';

describe('Math > Prime Factorization tests', () => {
  it('should return empty object for number less than 1', () => {
    expect(primeFactorize(-10)).toStrictEqual({});
    expect(primeFactorize(1)).toStrictEqual({});
  });

  it('should return correct prime factorization of a prime', () => {
    expect(primeFactorize(7)).toStrictEqual({ 7: 1 });
  });

  it('should return correct prime factorization of a non-prime', () => {
    expect(primeFactorize(100)).toStrictEqual({ 2: 2, 5: 2 });
  });
});
