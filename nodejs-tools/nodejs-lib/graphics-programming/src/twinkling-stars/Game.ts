import { CanvasWrapper } from '@/canvas-wrapper';
import { getCanvasBgColor } from '@/getCanvasBgColor';
import { Star } from './star';
import { repeat } from '@vighnesh153/tools-platform-independent';

interface GameOptions {
  bgColor?: string;
}

export class TwinklingStarsGame {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #bgColor: string;
  readonly #stars: Star[] = [];

  #isRunning = false;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;
    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);

    repeat(200, () => {
      this.#stars.push(new Star(canvasWrapper));
    });
  }

  *start() {
    this.#isRunning = true;
    while (this.#isRunning) {
      this.draw();
      this.updateStars();
      yield;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  draw() {
    this.clear();
    this.drawStars();
  }

  update() {
    this.updateStars();
  }

  private drawStars() {
    this.#stars.forEach((star) => star.draw());
  }

  private updateStars() {
    this.#stars.forEach((star) => star.update());
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(0, 0, canvasWidth, canvasHeight, this.#bgColor);
  }
}
