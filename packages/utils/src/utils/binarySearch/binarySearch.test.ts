import { describe, expect, test } from 'vitest';
import { binarySearch, BinarySearchComparator } from './binarySearch';

type Pokemon = {
  name: string;
  type: string;
};

const myFavouritePokemon: Pokemon[] = [
  { name: 'charizard', type: 'fire' },
  { name: 'chikorita', type: 'grass' },
  { name: 'pigeot', type: 'flying' },
  { name: 'pikachu', type: 'electric' },
  { name: 'treeko', type: 'grass' },
];

const pokemonComparator: BinarySearchComparator<Pokemon> = (pokemon1, pokemon2) =>
  pokemon1.name.localeCompare(pokemon2.name) as -1 | 0 | 1;

describe('Algorithms > Binary Search tests', () => {
  test.each([
    [[1, 2, 4, 5, 10], 5, 3],
    [[1, 2, 4, 5, 10], 10, 4],
    [[1, 2, 4, 5, 10], 1, 0],
    [[1, 2, 4, 5, 10], 42, null],
  ])('In array: %j, search: %j. Expected index: %j', (arr, searchValue, expectedSearchIndex) => {
    const searchIndex = binarySearch(arr, searchValue);
    expect(searchIndex).toBe(expectedSearchIndex);
  });

  test('custom comparator test (found)', () => {
    const targetPokemon = { name: 'pikachu', type: 'electric' };
    const actualIndex = binarySearch(myFavouritePokemon, targetPokemon, pokemonComparator);

    expect(actualIndex).toBe(3);
  });

  test('custom comparator test (not found)', () => {
    const targetPokemon = { name: 'dragonite', type: 'dragon' };
    const actualIndex = binarySearch(myFavouritePokemon, targetPokemon, pokemonComparator);

    expect(actualIndex).toBe(null);
  });
});
