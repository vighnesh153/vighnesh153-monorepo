import { describe, expect, test } from 'vitest';
import {
  areArraysEqual,
  ArrayComparison,
  isArrayGreaterThan,
  isArrayGreaterThanOrEqualTo,
  isArrayLessThan,
  isArrayLessThanOrEqualTo,
} from './arrayComparison';

describe('Helpers > Array Utils > Comparison tests', () => {
  test.each([
    [[1, 2, 3], [1, 2, 3], true],
    [[1, 2, 5], [1, 2, 4], false],
    [[1, 2, 5], [1, 2, 5, 9], false],
  ])('areArraysEqual(simple arrays): %j equals %j ? %j', (arr1, arr2, expected) => {
    expect(areArraysEqual(arr1, arr2)).toBe(expected);
  });

  test('areArraysEqual: complex object equality', () => {
    expect(
      areArraysEqual(
        [{ name: 'Pikachu' }, { name: 'Charizard' }],
        [{ name: 'Pikachu' }, { name: 'Charizard' }],
        (pokemon1, pokemon2) => pokemon1.name.localeCompare(pokemon2.name) as ArrayComparison
      )
    ).toBe(true);
  });

  test('areArraysEqual: complex object inequality', () => {
    expect(
      areArraysEqual(
        [{ name: 'Pikachu' }, { name: 'Charizard' }],
        [{ name: 'Pika Pika' }, { name: 'Charizard' }],
        (pokemon1, pokemon2) => pokemon1.name.localeCompare(pokemon2.name) as ArrayComparison
      )
    ).toBe(false);
  });

  test.each([
    [[1, 2, 3], [1, 2, 4], true],
    [[1, 2, 5], [1, 2, 4], false],
  ])('isArrayLessThan(simple arrays): %j lessThan %j ? %j', (arr1, arr2, expected) => {
    expect(isArrayLessThan(arr1, arr2)).toBe(expected);
  });

  test.each([
    [[{ age: 21 }, { age: 23 }], [{ age: 21 }, { age: 25 }], true],
    [[{ age: 21 }, { age: 23 }], [{ age: 21 }, { age: 22 }], false],
  ])('isArrayLessThan(complex arrays): %j lessThan %j ? %j', (arr1, arr2, expected) => {
    expect(
      isArrayLessThan(arr1, arr2, (el1: { age: number }, el2: { age: number }) =>
        // eslint-disable-next-line no-nested-ternary
        el1.age < el2.age ? -1 : el1.age === el2.age ? 0 : 1
      )
    ).toBe(expected);
  });

  test.each([
    [[1, 2, 3], [1, 2, 4], true],
    [[1, 2, 4], [1, 2, 4], true],
    [[1, 2, 5], [1, 2, 4], false],
  ])('isArrayLessThanOrEqualTo: %j <= %j ? %j', (arr1, arr2, expected) => {
    expect(isArrayLessThanOrEqualTo(arr1, arr2)).toBe(expected);
  });

  test.each([
    [[1, 2, 4], [1, 2, 3], true],
    [[1, 2, 3], [1, 2, 4], false],
  ])('isArrayGreaterThan: %j > %j ? %j', (arr1, arr2, expected) => {
    expect(isArrayGreaterThan(arr1, arr2)).toBe(expected);
  });

  test.each([
    [[1, 2, 4], [1, 2, 3], true],
    [[1, 2, 4], [1, 2, 4], true],
    [[1, 2, 3], [1, 2, 4], false],
  ])('isArrayGreaterThanOrEqualTo: %j >= %j ? %j', (arr1, arr2, expected) => {
    expect(isArrayGreaterThanOrEqualTo(arr1, arr2)).toBe(expected);
  });
});
