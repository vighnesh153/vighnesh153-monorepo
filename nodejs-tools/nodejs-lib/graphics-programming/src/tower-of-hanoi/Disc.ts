import { CanvasWrapper } from '@/canvas-wrapper';
import { Position } from './Position';

export interface DiscConfig {
  center: Position;

  width: number;
  thickness: number;

  border: {
    width: number;
    color: string;
  };

  color: string;
}

export class Disc {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #config: DiscConfig;

  constructor(canvasWrapper: CanvasWrapper, config: DiscConfig) {
    this.#canvasWrapper = canvasWrapper;
    this.#config = config;
  }

  draw() {
    const { center, width, thickness, color, border } = this.#config;

    const topLeftX = center.x - width / 2;
    const topLeftY = center.y - thickness / 2;

    this.#canvasWrapper.drawFilledRect(topLeftX, topLeftY, width, thickness, color);
    this.#canvasWrapper.drawOutlinedRect(topLeftX, topLeftY, width, thickness, border.width, border.color);
  }
}
