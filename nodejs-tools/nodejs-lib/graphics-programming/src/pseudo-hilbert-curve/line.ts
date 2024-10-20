import { Point } from "./point.ts";

export class Line {
  readonly point1: Point;
  readonly point2: Point;

  constructor(point1: Point, point2: Point) {
    this.point1 = point1;
    this.point2 = point2;
  }
}
