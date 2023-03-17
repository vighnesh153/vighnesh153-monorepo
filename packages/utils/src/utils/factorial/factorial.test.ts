import { describe, expect, it, test } from 'vitest';
import { factorial } from './factorial';

describe('Math > Numbers > factorial tests', () => {
  it('should throw if input number is not an integer', () => {
    expect(() => factorial(2213.3)).toThrowErrorMatchingInlineSnapshot(
      '"Factorial of fractional numbers is not defined"'
    );
  });

  it('should throw if input number is not positive', () => {
    expect(() => factorial(-4)).toThrowErrorMatchingInlineSnapshot('"Factorial of negative numbers is not defined"');
  });

  test.each([
    [1, 1],
    [3, 6],
    [5, 120],
    [10, 3628800],
  ])('factorial(%j) equals %j', (n, result) => {
    expect(factorial(n)).toBe(result);
  });
});
