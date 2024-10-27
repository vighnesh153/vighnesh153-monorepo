import {
  randEmail,
  randFullName,
  randImg,
  randUuid,
  seed,
} from "@ngneat/falso";

/**
 * Generates a random email address
 */
export function randomEmail(): string {
  return randEmail();
}

/**
 * Generates a random image link
 */
export function randomImage(): string {
  return randImg();
}

/**
 * Generates a full random name
 */
export function randomName(): string {
  return randFullName();
}

/**
 * Generates a random uuid
 */
export function randomUuid(): string {
  return randUuid();
}

/**
 * Applies and resets the seed before and after generating the random value
 *
 * ```ts
 * export function randomName(seedValue?: string): string {
 *   return randomWithSeed(() => randFullName(), seedValue);
 * }
 * ```
 *
 * @param generator
 * @param seedValue
 */
export function randomWithSeed<T>(generator: () => T, seedValue: string): T {
  // apply seed
  seed(seedValue);

  const randomValue = generator();

  // reset seed
  seed();

  return randomValue;
}
