import { randomInteger } from '@vighnesh153/tools-platform-independent';
import { Position } from './Position';

export function generateRandomPosition(boundX: number, boundY: number): Position {
  return {
    x: randomInteger(0, boundX),
    y: randomInteger(0, boundY),
  };
}
