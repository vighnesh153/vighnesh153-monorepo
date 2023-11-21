import { generateTwoMidPoints } from './generateTwoMidpoints';
import { getDistantCorner } from './getDistantCorner';
import { Line } from './line';
import { Point } from './point';

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

  // return [new Line(c1, c2), new Line(c2, c3), new Line(c3, c4)];

  // mid points
  const { midPoint1: c, midPoint2: d } = generateTwoMidPoints(c1, c2);
  const { midPoint1: g, midPoint2: h } = generateTwoMidPoints(c2, c3);
  const { midPoint1: f, midPoint2: e } = generateTwoMidPoints(c3, c4);
  const { midPoint1: b, midPoint2: a } = generateTwoMidPoints(c4, c1);
  const { midPoint1: i, midPoint2: k } = generateTwoMidPoints(a, g);
  const { midPoint1: j, midPoint2: l } = generateTwoMidPoints(b, h);

  // curve near p1
  const p1Curve = generateCurve(c, i, a, c1, level - 1);
  // curve near p2
  const p2Curve = generateCurve(d, c2, g, k, level - 1);
  // curve near p3
  const p3Curve = generateCurve(l, h, c3, f, level - 1);
  // curve near p3
  const p4Curve = generateCurve(c4, b, j, e, level - 1);

  return [
    ...p1Curve.toReversed(),
    new Line(p1Curve[0].point1, p2Curve[0].point1),
    ...p2Curve,
    new Line(p2Curve[p2Curve.length - 1].point2, p3Curve[0].point1),
    ...p3Curve,
    new Line(p3Curve[p3Curve.length - 1].point2, p4Curve[p3Curve.length - 1].point2),
    ...p4Curve.toReversed(),
  ];
}
