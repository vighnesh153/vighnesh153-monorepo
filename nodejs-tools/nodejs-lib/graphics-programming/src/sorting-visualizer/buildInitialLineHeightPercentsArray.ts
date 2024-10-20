import { randomIntegerBetween } from '@std/random';

export function buildInitialLineHeightPercentsArray(size: number, from = 10, to = 100): Array<number> {
  return Array.from({ length: size }).map(() => randomIntegerBetween(from, to));
}
