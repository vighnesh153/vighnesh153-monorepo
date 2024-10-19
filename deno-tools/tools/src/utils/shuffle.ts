/**
 * Shuffles the given iterable
 *
 * @param iterable - iterable to be shuffled
 * @returns list of shuffled items from the iterable
 */
export function shuffleIterable<T>(iterable: Iterable<T>): T[] {
  return Array.from(iterable).sort(() => (Math.random() < 0.5 ? -1 : 1));
}

/**
 * Shuffles the give string
 *
 * @param s string to be shuffled
 * @returns shuffled string
 */
export function shuffleString(s: string): string {
  return shuffleIterable(s).join("");
}
