import { CanvasWrapper } from '@/canvas-wrapper';
import { Position } from './Position';

export interface RodConfig {
  color: string;
  baseCenterPosition: Position;
  baseWidth: number;
  thickness: number;
  height: number;
}

export class Rod {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #config: RodConfig;

  constructor(canvasWrapper: CanvasWrapper, config: RodConfig) {
    this.#canvasWrapper = canvasWrapper;
    this.#config = config;
  }

  get topY(): number {
    return this.#config.baseCenterPosition.y - this.#config.height;
  }

  get baseCenterPosition(): Position {
    return {
      ...this.#config.baseCenterPosition,
    };
  }

  draw() {
    this.drawBase();
    this.drawRod();
  }

  private drawBase() {
    const { baseWidth, thickness, color } = this.#config;
    const { x, y } = this.#config.baseCenterPosition;

    const topLeftX = x - baseWidth / 2;
    const topLeftY = y;

    this.#canvasWrapper.drawFilledRect(topLeftX, topLeftY, baseWidth, thickness, color);
  }

  private drawRod() {
    const { height, thickness, color } = this.#config;
    const { x } = this.#config.baseCenterPosition;

    const topLeftX = x - thickness / 2;
    const topLeftY = this.topY;

    this.#canvasWrapper.drawFilledRect(topLeftX, topLeftY, thickness, height, color);
  }
}
