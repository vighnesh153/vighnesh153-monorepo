import { range } from '@vighnesh153/utils';

import { CanvasWrapper } from '@/canvas-wrapper';
import { Rod, type RodConfig } from './Rod';
import { Position } from './Position';

export class RodManager {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #rodCount: number;

  readonly #rods: Rod[] = [];

  #baseWidth = 0;

  get baseWidth(): number {
    return this.#baseWidth;
  }

  constructor(canvasWrapper: CanvasWrapper, rodCount: number, rodConfig: Partial<RodConfig>) {
    this.#canvasWrapper = canvasWrapper;
    this.#rodCount = rodCount;

    this.initializeRods(rodConfig);
  }

  drawRods() {
    this.#rods.forEach((rod) => rod.draw());
  }

  getBaseCenterPosition(rodIndex: number): Position | null {
    return this.#rods[rodIndex]?.baseCenterPosition ?? null;
  }

  private initializeRods(rodConfig: Partial<RodConfig>) {
    const cw = this.#canvasWrapper.width;
    const ch = this.#canvasWrapper.height;
    const rodCount = this.#rodCount;

    this.#baseWidth = cw / (rodCount + 1);
    const rodHeight = rodConfig?.height ?? ch / 2;
    const rodColor = rodConfig?.color ?? 'black';
    const rodThickness = rodConfig?.thickness ?? ch * 0.02;
    const rodBaseY = Math.floor((this.#canvasWrapper.height * 4) / 5);

    const baseXPositionsOffset = Array.from(range(0, rodCount - 1)).map(
      (index) => 100 * (1 / (rodCount * 2) + index / rodCount)
    );

    baseXPositionsOffset.forEach((offset) => {
      this.#rods.push(
        new Rod(this.#canvasWrapper, {
          baseWidth: this.#baseWidth,
          height: rodHeight,
          color: rodColor,
          thickness: rodThickness,
          baseCenterPosition: rodConfig?.baseCenterPosition ?? {
            x: Math.floor((cw * offset) / 100),
            y: rodBaseY,
          },
        })
      );
    });
  }
}
