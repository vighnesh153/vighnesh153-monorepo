import { randomIntegerBetween } from "@std/random";
import type { Position } from "./position.ts";

export function generateRandomPosition(
  boundX: number,
  boundY: number,
): Position {
  return {
    x: randomIntegerBetween(0, boundX),
    y: randomIntegerBetween(0, boundY),
  };
}
