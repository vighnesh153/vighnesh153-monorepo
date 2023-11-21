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
    const { width, height } = this.#canvasWrapper;
    const level = 5;
    const size = Math.round((height * 5) / 11);

    const x1 = width / 2 - size / 2;
    const x2 = x1 + size;
    const y1 = height / 2 - size / 2;
    const y2 = y1 + size;

    const p1 = new Point(x1, y1);
    const p2 = new Point(x1, y2);
    const p3 = new Point(x2, y2);
    const p4 = new Point(x2, y1);

    const curves = generateCurve(p1, p2, p3, p4, level);
    this.drawLines(curves);

    yield;
  }

  private drawLines(lines: Line[]): void {
    for (const line of lines) {
      this.#canvasWrapper.drawLine(line.point1.x, line.point1.y, line.point2.x, line.point2.y, 2, 'black');
    }
  }
}
