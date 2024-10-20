import { CanvasWrapper } from '@/canvas-wrapper.ts';
import { Position } from './Position.ts';
import { Disc } from './Disc.ts';

export interface StackConfig {
  color: string;
  baseCenterPosition: Position;
  baseWidth: number;
  thickness: number;
  height: number;
}

export class Stack {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #config: StackConfig;

  readonly #discs: Disc[] = [];

  constructor(canvasWrapper: CanvasWrapper, config: StackConfig) {
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
    this.drawDiscs();
  }

  addDisc(disc: Omit<Disc, 'center'>) {
    const discProcessed = disc as Disc;
    const pos = this.getPositionForNewDisc();
    discProcessed.center = {
      x: pos.x,
      y: pos.y - this.#config.thickness / 2,
    };
    this.#discs.push(discProcessed);
  }

  removeDisc(): Disc | null {
    return this.#discs.pop() ?? null;
  }

  getPositionForNewDisc(): Position {
    const discCount = this.#discs.length;
    if (discCount > 0) {
      const disc = this.#discs[discCount - 1];
      const discCenter = disc.center;
      return {
        ...discCenter,
        y: discCenter.y - disc.thickness / 2 - disc.borderConfig.width,
      };
    }

    return {
      ...this.#config.baseCenterPosition,
    };
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

  private drawDiscs() {
    this.#discs.forEach((disc) => disc.draw());
  }
}
