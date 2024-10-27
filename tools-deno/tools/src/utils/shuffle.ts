type Randomizer<T> = (a: T, b: T) => -1 | 0 | 1;

const defaultRandomizer = () => (Math.random() < 0.5 ? -1 : 1);

/**
 * Shuffles the given iterable
 *
 * @param iterable - iterable to be shuffled
 * @returns list of shuffled items from the iterable
 */
export function shuffleIterable<T>(
  iterable: Iterable<T>,
  randomizer: Randomizer<T> = defaultRandomizer,
): T[] {
  return Array.from(iterable).sort(randomizer);
}

/**
 * Shuffles the give string
 *
 * @param s string to be shuffled
 * @returns shuffled string
 */
export function shuffleString(
  s: string,
  randomizer: Randomizer<string> = defaultRandomizer,
): string {
  return shuffleIterable(s, randomizer).join("");
}
