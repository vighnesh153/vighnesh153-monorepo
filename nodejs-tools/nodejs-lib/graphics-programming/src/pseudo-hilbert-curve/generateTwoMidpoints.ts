import { Point } from './point';

interface TwoMidpoints {
  midPoint1: Point;
  midPoint2: Point;
}

export function generateTwoMidPoints(startPoint: Point, endPoint: Point): TwoMidpoints {
  const isXDifferent = startPoint.x !== endPoint.x;

  // one of distX or distY will be 0
  const distX = Math.abs(startPoint.x - endPoint.x);
  const distY = Math.abs(startPoint.y - endPoint.y);
  const dist = (isXDifferent ? distX : distY) / 3;

  const start = isXDifferent ? startPoint.x : startPoint.y;
  const end = isXDifferent ? endPoint.x : endPoint.y;
  const sign = start < end ? 1 : -1;

  const midPoint1 = Math.round(start + sign * dist);
  const midPoint2 = Math.round(start + sign * dist * 2);

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
