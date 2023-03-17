/**
 * Shuffle an iterable
 *
 * @param iterable - iterable to be shuffled
 */
export function shuffle<T>(iterable: Iterable<T>): T[] {
  return Array.from(iterable).sort(() => (Math.random() < 0.5 ? -1 : 1));
}
