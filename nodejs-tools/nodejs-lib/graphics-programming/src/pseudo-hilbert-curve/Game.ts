import { not } from '@vighnesh153/tools';
import { CanvasWrapper } from '@/canvas-wrapper.ts';
import { getCanvasBgColor } from '@/getCanvasBgColor.ts';
import { generateCurve } from './generateCurve.ts';
import { Point } from './point.ts';
import { Line } from './line.ts';

interface GameConfig {
  bgColor?: string;
  lineWidth?: number;
  lineColor?: string;
}

export class PseudoHilbertCurveGame {
  #canvasWrapper: CanvasWrapper;
  #isRunning = true;

  readonly #bgColor: string;
  readonly #lineWidth: number;
  readonly #lineColor: string;

  constructor(canvasWrapper: CanvasWrapper, config: GameConfig = {}) {
    this.#canvasWrapper = canvasWrapper;
    this.#bgColor = config.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.#lineWidth = config.lineWidth ?? 3;
    this.#lineColor = config.lineColor ?? 'black';
  }

  *start(level: number) {
    this.#isRunning = true;

    const { width, height } = this.#canvasWrapper;
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

    for (const line of curves) {
      if (not(this.#isRunning)) {
        break;
      }
      this.drawLine(line);
      yield;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(0, 0, canvasWidth, canvasHeight, this.#bgColor);
  }

  private drawLine(line: Line): void {
    this.#canvasWrapper.drawLine(
      line.point1.x,
      line.point1.y,
      line.point2.x,
      line.point2.y,
      this.#lineWidth,
      this.#lineColor
    );
  }
}
