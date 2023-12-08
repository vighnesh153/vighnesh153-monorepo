import { describe, expect, it, test } from 'vitest';
import { gcd } from './gcd';

describe('Math > gcd tests', () => {
  it('should throw error if negative number is passed', () => {
    expect(() => gcd(-1)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "n" to be a positive integer, found "-1"]'
    );
  });

  it('should throw error if decimal number is passed', () => {
    expect(() => gcd(0.5)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "n" to be a positive integer, found "0.5"]'
    );
  });

  test.each([
    [[], 1],
    [[0], 1],
    [[1], 1],
    [[0, 5], 1],
    [[2, 4], 2],
    [[4, 4, 4], 4],
    [[7, 8, 3], 1],
    [[9, 30, 21], 3],
  ])('gcd(...%j) equals %j', (values, expectedGcd) => {
    expect(gcd(...values)).toBe(expectedGcd);
  });
});
