import { describe, expect, test } from 'vitest';
import { binarySearchLeftmost } from './binarySearchLeftmost';
import { BinarySearchComparator } from '../binarySearch';

type Pokemon = {
  name: string;
  type: string;
};

const myFavouritePokemon: Pokemon[] = [
  { name: 'charizard', type: 'fire' },
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

describe('Algorithms > Binary Search Leftmost tests', () => {
  test.each([
    [[1, 2, 4, 5, 10], 5, 3],
    [[1, 2, 2, 2, 2], 2, 1],
    [[1, 2, 2, 2, 2], 1, 0],
    [[1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5], 5, 9],
    [[1, 2, 2, 2, 2], 99, null],
  ])('In array: %j, search: %j. Expected index: %j', (arr, searchValue, expectedSearchIndex) => {
    const searchIndex = binarySearchLeftmost(arr, searchValue);
    expect(searchIndex).toBe(expectedSearchIndex);
  });

  test('custom comparator test (found)', () => {
    const targetPokemon = { name: 'pikachu', type: 'electric' };
    const actualIndex = binarySearchLeftmost(myFavouritePokemon, targetPokemon, pokemonComparator);

    expect(actualIndex).toBe(5);
  });

  test('custom comparator test (not found)', () => {
    const targetPokemon = { name: 'dragonite', type: 'dragon' };
    const actualIndex = binarySearchLeftmost(myFavouritePokemon, targetPokemon, pokemonComparator);

    expect(actualIndex).toBe(null);
  });
});
