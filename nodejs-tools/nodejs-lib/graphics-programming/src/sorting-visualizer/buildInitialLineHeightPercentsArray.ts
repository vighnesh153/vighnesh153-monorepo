import { randomInteger } from '@vighnesh153/tools-platform-independent';

export function buildInitialLineHeightPercentsArray(size: number, from = 10, to = 100): Array<number> {
  return Array.from({ length: size }).map(() => randomInteger(from, to));
}
