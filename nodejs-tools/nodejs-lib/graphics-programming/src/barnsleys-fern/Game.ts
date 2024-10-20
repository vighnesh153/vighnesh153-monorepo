import { CanvasWrapper } from '@/canvas-wrapper.ts';
import { getCanvasBgColor } from '@/getCanvasBgColor.ts';
import { BarnsleysFernGenerator } from './BarnsleysFernGenerator.ts';

interface GameOptions {
  bgColor?: string;
  dotColor?: string;
  speed?: number;
}

export class BarnsleysFern {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #bgColor: string;
  readonly #dotColor: string;
  readonly #speed: number;
  readonly #barnsleysFernGenerator: BarnsleysFernGenerator;

  #isRunning = false;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;
    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.#dotColor = options.dotColor ?? 'green';
    this.#speed = options.speed ?? 50;

    this.#barnsleysFernGenerator = new BarnsleysFernGenerator();
  }

  *start() {
    this.#isRunning = true;
    while (this.#isRunning) {
      for (let i = 0; i < this.#speed; i++) {
        this.draw();
        this.update();
      }
      yield;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  draw() {
    this.drawFern();
  }

  update() {
    this.updateFern();
  }

  private drawFern() {
    const { x, y } = this.#barnsleysFernGenerator;

    // transform and scale
    const plotX = (this.#canvasWrapper.width * x) / 6 + this.#canvasWrapper.width / 2;
    const plotY = (this.#canvasWrapper.height - 20) * (1 - y / 10) + 10;

    this.#canvasWrapper.drawFilledCircle(plotX, plotY, 1, this.#dotColor);
  }

  private updateFern() {
    this.#barnsleysFernGenerator.generateNext();
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(0, 0, canvasWidth, canvasHeight, this.#bgColor);
  }
}
