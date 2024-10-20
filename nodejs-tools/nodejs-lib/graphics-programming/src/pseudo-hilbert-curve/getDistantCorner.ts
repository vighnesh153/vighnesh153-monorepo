/* eslint-disable @typescript-eslint/no-use-before-define */
import { euclidianDistance } from './euclidian-distance.ts';
import { Point } from './point.ts';

// repel -> as in repel like a magnet
export function getDistantCorner(point: Point, repelPoint1: Point, repelPoint2: Point): Point {
  const distance = euclidianDistance([point.x, point.y], [repelPoint1.x, repelPoint1.y]) / 4;

  const potentialPoints = [
    new Point(point.x + distance, point.y + distance),
    new Point(point.x + distance, point.y - distance),
    new Point(point.x - distance, point.y + distance),
    new Point(point.x - distance, point.y - distance),
  ];

  const farthestPointsFromRepelPoint1 = findFarthestPoints(repelPoint1, potentialPoints);
  const farthestPointsFromRepelPoint2 = findFarthestPoints(repelPoint2, potentialPoints);

  const intersection = findIntersectionPoints(farthestPointsFromRepelPoint1, farthestPointsFromRepelPoint2);

  if (intersection.length !== 1) {
    throw new Error('intersection length should be 1');
  }

  return intersection[0];
}

function findFarthestPoints(pivotPoint: Point, points: Point[]): Point[] {
  let farthestPoints: Point[] = [];
  let maxDistance = 0;
  for (const point of points) {
    const dist = euclidianDistance([point.x, point.y], [pivotPoint.x, pivotPoint.y]);
    if (dist > maxDistance) {
      maxDistance = dist;
      farthestPoints = [point];
    } else if (dist === maxDistance) {
      farthestPoints.push(point);
    }
  }
  return farthestPoints;
}

function findIntersectionPoints(list1: Point[], list2: Point[]): Point[] {
  const common: Point[] = [];
  for (const point of list1) {
    if (list2.includes(point)) {
      common.push(point);
    }
  }
  return common;
}
