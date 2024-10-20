/* eslint-disable @typescript-eslint/no-use-before-define */
import { euclidianDistance } from "./euclidian-distance.ts";
import { Point } from "./point.ts";

interface TwoMidpoints {
  midPoint1: Point;
  midPoint2: Point;
}

export function generateTwoMidPoints(
  startPoint: Point,
  endPoint: Point,
): TwoMidpoints {
  const isXDifferent = !isCloseEnough(startPoint.x, endPoint.x);

  const dist =
    euclidianDistance([startPoint.x, startPoint.y], [endPoint.x, endPoint.y]) /
    3;

  const start = isXDifferent ? startPoint.x : startPoint.y;
  const end = isXDifferent ? endPoint.x : endPoint.y;
  const sign = start < end ? 1 : -1;

  const midPoint1 = start + sign * dist;
  const midPoint2 = start + sign * dist * 2;

  if (isXDifferent) {
    return {
      midPoint1: new Point(midPoint1, startPoint.y),
      midPoint2: new Point(midPoint2, startPoint.y),
    };
  }
  return {
    midPoint1: new Point(startPoint.x, midPoint1),
    midPoint2: new Point(startPoint.x, midPoint2),
  };
}

function isCloseEnough(
  value1: number,
  value2: number,
  threshold = 0.01,
): boolean {
  return Math.abs(value1 - value2) <= threshold;
}
