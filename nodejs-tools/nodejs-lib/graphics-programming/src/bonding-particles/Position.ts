import { randomInteger } from '@vighnesh153/tools-platform-independent';

export interface Position {
  x: number;
  y: number;
}

export function createPosition(widthLimit: number, heightLimit: number): Position {
  return {
    x: randomInteger(0, widthLimit),
    y: randomInteger(0, heightLimit),
  };
}
