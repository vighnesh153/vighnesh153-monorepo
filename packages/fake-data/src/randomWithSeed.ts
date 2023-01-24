import { seed } from '@ngneat/falso';

/**
 * Applies and resets the seed before and after generating the random value
 *
 * @param generator
 * @param seedValue
 *
 * @example
 * export function randomName(seedValue?: string): string {
 *   return randomWithSeed(() => randFullName(), seedValue);
 * }
 */
export function randomWithSeed<T>(generator: () => T, seedValue: string): T {
  // apply seed
  seed(seedValue);

  const randomValue = generator();

  // reset seed
  seed();

  return randomValue;
}
