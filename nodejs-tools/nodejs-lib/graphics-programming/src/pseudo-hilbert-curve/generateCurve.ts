/* eslint-disable @typescript-eslint/no-use-before-define */
import { generateTwoMidPoints } from './generateTwoMidpoints.ts';
import { getDistantCorner } from './getDistantCorner.ts';
import { Line } from './line.ts';
import { Point } from './point.ts';

/**
 *
 *  c1---------a          b---------c4
 *             |          |
 *       p1    |          |    p4
 *       |     |          |    |
 *  c----------i          j---------e
 *  |    |                     |    |
 *  |    |                     |    |
 *  |    |                     |    |
 *  d    |     k----------l    |    f
 *  |    |     |          |    |    |
 *  |    p2----|----------|----p3   |
 *  |          |          |         |
 *  c2---------g          h---------c3
 *
 */
export function generateCurve(p1: Point, p2: Point, p3: Point, p4: Point, level: number): Line[] {
  if (level < 1) {
    throw new Error('Level cannot be less than 1');
  }
  if (level === 1) return [new Line(p1, p2), new Line(p2, p3), new Line(p3, p4)];

  // corners
  const c1 = getDistantCorner(p1, p2, p4);
  const c2 = getDistantCorner(p2, p3, p1);
  const c3 = getDistantCorner(p3, p4, p2);
  const c4 = getDistantCorner(p4, p1, p3);

  // mid points
  const { midPoint1: c, midPoint2: d } = generateTwoMidPoints(c1, c2);
  const { midPoint1: g, midPoint2: h } = generateTwoMidPoints(c2, c3);
  const { midPoint1: f, midPoint2: e } = generateTwoMidPoints(c3, c4);
  const { midPoint1: b, midPoint2: a } = generateTwoMidPoints(c4, c1);
  const { midPoint1: i, midPoint2: k } = generateTwoMidPoints(a, g);
  const { midPoint1: j, midPoint2: l } = generateTwoMidPoints(b, h);

  // curve near p1
  const p1Curve = generateCurve(c1, a, i, c, level - 1);
  // curve near p2
  const p2Curve = generateCurve(d, c2, g, k, level - 1);
  // curve near p3
  const p3Curve = generateCurve(l, h, c3, f, level - 1);
  // curve near p3
  const p4Curve = generateCurve(e, j, b, c4, level - 1);

  return [
    ...p1Curve,
    // connector for p1Curve and p2Curve
    new Line(p1Curve.at(-1)!.point2, p2Curve[0].point1),
    ...p2Curve,
    // connector for p2Curve and p3Curve
    new Line(p2Curve.at(-1)!.point2, p3Curve[0].point1),
    ...p3Curve,
    // connector for p3Curve and p4Curve
    new Line(p3Curve.at(-1)!.point2, p4Curve[0].point1),
    ...p4Curve,
  ];
}
