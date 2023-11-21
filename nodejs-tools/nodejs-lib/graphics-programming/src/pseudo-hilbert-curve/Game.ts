import { CanvasWrapper } from '@/canvas-wrapper';
import { generateCurve } from './generateCurve';
import { Point } from './point';
import { Line } from './line';

export class PseudoHilbertCurveGame {
  #canvasWrapper: CanvasWrapper;

  constructor(canvasWrapper: CanvasWrapper) {
    this.#canvasWrapper = canvasWrapper;
  }

  *start() {
    for (const level of [3]) {
      const p1 = new Point(100, 100);
      const p2 = new Point(100, 200);
      const p3 = new Point(200, 200);
      const p4 = new Point(200, 100);
      const curves = generateCurve(p1, p2, p3, p4, level);

      this.drawLines(curves);
    }

    yield;
  }

  private drawLines(lines: Line[]): void {
    for (const line of lines) {
      this.#canvasWrapper.drawLine(line.point1.x, line.point1.y, line.point2.x, line.point2.y, 2, 'black');
    }
  }
}
