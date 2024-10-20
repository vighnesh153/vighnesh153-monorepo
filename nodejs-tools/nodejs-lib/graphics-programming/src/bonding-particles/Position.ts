import { randomIntegerBetween } from '@std/random';

export interface Position {
  x: number;
  y: number;
}

export function createPosition(widthLimit: number, heightLimit: number): Position {
  return {
    x: randomIntegerBetween(0, widthLimit),
    y: randomIntegerBetween(0, heightLimit),
  };
}
