import { describe, expect, test } from 'vitest';
import { previousPrime } from './previousPrime';

describe('Math > previousPrime tests', () => {
  test.each([
    [2, null],
    [3, 2],
    [7.5, 7],
    [15, 13],
  ])(`previousPrime(%j) equals %j`, (current, expected) => {
    expect(previousPrime(current)).toBe(expected);
  });
});
