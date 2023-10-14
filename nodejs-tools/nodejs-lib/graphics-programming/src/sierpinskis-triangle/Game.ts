import { randomInteger, repeat } from '@vighnesh153/utils';
import { CanvasWrapper } from '..';

export interface SierpinskisTriangleGamePoint {
  x: number;
  y: number;
}

export interface SierpinskisTriangleGameOptions {
  pointRadius?: number;

  initialPoint1?: SierpinskisTriangleGamePoint;
  initialPoint2?: SierpinskisTriangleGamePoint;
  initialPoint3?: SierpinskisTriangleGamePoint;

  initialPointColor?: string;
  regularPointColor?: string;

  speed?: number;
}

export class SierpinskisTriangleGame {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #initialPoint1: SierpinskisTriangleGamePoint;
  readonly #initialPoint2: SierpinskisTriangleGamePoint;
  readonly #initialPoint3: SierpinskisTriangleGamePoint;

  readonly #pointRadius: number;
  readonly #initialPointColor: string;
  readonly #regularPointColor: string;
  readonly #speed: number;

  #chaosPoint: SierpinskisTriangleGamePoint;
  #isRunning = false;

  private get initialPoints() {
    return [this.#initialPoint1, this.#initialPoint2, this.#initialPoint3];
  }

  constructor(canvasWrapper: CanvasWrapper, options: SierpinskisTriangleGameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;

    this.#pointRadius = options?.pointRadius ?? 1;
    this.#initialPointColor = options?.initialPointColor ?? 'red';
    this.#regularPointColor = options?.regularPointColor ?? 'green';
    this.#speed = options?.speed ?? 1;

    const top = 1 / 10;
    const bottom = 1 - top;
    const left = 4 / 5;
    const right = 1 - left;

    const cw = canvasWrapper.width;
    const ch = canvasWrapper.height;

    this.#initialPoint1 = options.initialPoint1 ?? {
      x: Math.floor(cw / 2),
      y: Math.floor(ch * top),
    };

    this.#initialPoint2 = options.initialPoint2 ?? {
      x: Math.floor(cw * left),
      y: Math.floor(ch * bottom),
    };

    this.#initialPoint3 = options.initialPoint3 ?? {
      x: Math.floor(cw * right),
      y: Math.floor(ch * bottom),
    };

    this.#chaosPoint = this.#initialPoint1;

    this.drawInitialPoints();
  }

  *start() {
    this.#isRunning = true;

    while (this.#isRunning) {
      repeat(this.#speed, () => {
        this.update();
        this.paint();
      });
      yield;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  private update() {
    const points = this.initialPoints;
    const randomIndex = randomInteger(0, points.length - 1);

    const randomPoint = points[randomIndex];

    this.#chaosPoint = {
      x: Math.floor((this.#chaosPoint.x + randomPoint.x) / 2),
      y: Math.floor((this.#chaosPoint.y + randomPoint.y) / 2),
    };
  }

  private paint() {
    this.drawPoint(this.#chaosPoint, this.#regularPointColor);
  }

  private drawPoint(point: SierpinskisTriangleGamePoint, color: string) {
    this.#canvasWrapper.drawFilledCircle(point.x, point.y, this.#pointRadius, color);
  }

  private drawInitialPoints() {
    this.initialPoints.forEach((point) => {
      this.drawPoint(point, this.#initialPointColor);
    });
  }
}
