import { randomInteger } from '@vighnesh153/utils';

export function buildInitialLineHeightPercentsArray(size: number, from = 10, to = 100): Array<number> {
  return Array.from({ length: size }).map(() => randomInteger(from, to));
}
