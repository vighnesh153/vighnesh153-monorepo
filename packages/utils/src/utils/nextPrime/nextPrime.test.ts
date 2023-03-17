import { describe, expect, test } from 'vitest';
import { nextPrime } from './nextPrime';

describe('Math > nextPrime tests', () => {
  test.each([
    [2, 3],
    [3, 5],
    [7.5, 11],
    [15, 17],
  ])(`nextPrime(%j) equals %j`, (current, expected) => {
    expect(nextPrime(current)).toBe(expected);
  });
});
