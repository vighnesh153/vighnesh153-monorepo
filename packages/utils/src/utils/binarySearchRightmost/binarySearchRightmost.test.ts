import { describe, expect, test } from 'vitest';
import { binarySearchRightmost } from './binarySearchRightmost';
import { BinarySearchComparator } from '../binarySearch';

type Pokemon = {
  name: string;
  type: string;
};

const myFavouritePokemon: Pokemon[] = [
  { name: 'charizard', type: 'fire' },
  { name: 'chikorita', type: 'grass' },
  { name: 'chikorita', type: 'grass' },
  { name: 'chikorita', type: 'grass' },
  { name: 'pigeot', type: 'flying' },
  { name: 'pigeot', type: 'flying' },
  { name: 'pikachu', type: 'electric' },
  { name: 'pikachu', type: 'electric' },
  { name: 'pikachu', type: 'electric' },
  { name: 'pikachu', type: 'electric' },
  { name: 'treeko', type: 'grass' },
  { name: 'treeko', type: 'grass' },
];

const pokemonComparator: BinarySearchComparator<Pokemon> = (pokemon1, pokemon2) =>
  pokemon1.name.localeCompare(pokemon2.name) as -1 | 0 | 1;

describe('Algorithms > Binary Search Rightmost tests', () => {
  test.each([
    [[1, 2, 4, 5, 10], 5, 3],
    [[1, 2, 2, 2, 2], 2, 4],
    [[1, 2, 2, 2, 2], 1, 0],
    [[1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5], 5, 11],
    [[1, 2, 2, 2, 2], 99, null],
  ])('In array: %j, search: %j. Expected index: %j', (arr, searchValue, expectedSearchIndex) => {
    const searchIndex = binarySearchRightmost(arr, searchValue);
    expect(searchIndex).toBe(expectedSearchIndex);
  });

  test('custom comparator test (found)', () => {
    const targetPokemon = { name: 'pikachu', type: 'electric' };
    const actualIndex = binarySearchRightmost(myFavouritePokemon, targetPokemon, pokemonComparator);

    expect(actualIndex).toBe(9);
  });

  test('custom comparator test (not found)', () => {
    const targetPokemon = { name: 'dragonite', type: 'dragon' };
    const actualIndex = binarySearchRightmost(myFavouritePokemon, targetPokemon, pokemonComparator);

    expect(actualIndex).toBe(null);
  });
});
