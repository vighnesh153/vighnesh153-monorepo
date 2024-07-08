import { describe, it, expect } from 'vitest';
import { groupArrayItems, groupStringCharacters } from './groupIterableItems';

describe('"groupStringCharacters" tests', () => {
  it('should throw error if group length is non-integer or less than 1', () => {
    expect(() => groupStringCharacters('abc', 0)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "groupLength" to be an integer and at least "1", found "0"]'
    );
    expect(() => groupStringCharacters('abc', 1.5)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "groupLength" to be an integer and at least "1", found "1.5"]'
    );
    expect(() => groupStringCharacters('abc', -2)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "groupLength" to be an integer and at least "1", found "-2"]'
    );
  });

  it('should make single character groups', () => {
    expect(groupStringCharacters('abc')).toStrictEqual(['a', 'b', 'c']);
  });

  it('should make multi-character groups', () => {
    expect(groupStringCharacters('Vighnesh', 3)).toEqual(['Vig', 'hne', 'sh']);
    expect(groupStringCharacters('Pikachu', 3)).toEqual(['Pik', 'ach', 'u']);
  });
});

describe('"groupArrayItems" tests', () => {
  it('should throw error if group length is non-integer or less than 1', () => {
    expect(() => groupArrayItems(['a', 'b', 'c'], 0)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "groupLength" to be an integer and at least "1", found "0"]'
    );
    expect(() => groupArrayItems(['a', 'b', 'c'], 1.5)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "groupLength" to be an integer and at least "1", found "1.5"]'
    );
    expect(() => groupArrayItems(['a', 'b', 'c'], -2)).toThrowErrorMatchingInlineSnapshot(
      '[Error: Expected "groupLength" to be an integer and at least "1", found "-2"]'
    );
  });

  it('should make single item groups', () => {
    expect(groupArrayItems([1, 2, 3])).toStrictEqual([[1], [2], [3]]);
  });

  it('should make multi-item groups', () => {
    expect(groupArrayItems([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ]);
    expect(groupArrayItems([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });
});
