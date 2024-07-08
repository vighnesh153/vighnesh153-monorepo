import { range } from '@vighnesh153/tools-platform-independent';

import { CanvasWrapper } from '@/canvas-wrapper';
import { Stack, type StackConfig } from './Stack';

export class StacksManager {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #stackCount: number;

  readonly #stacks: Stack[] = [];

  #baseWidth = 0;

  get baseWidth(): number {
    return this.#baseWidth;
  }

  constructor(canvasWrapper: CanvasWrapper, rodCount: number, rodConfig: Partial<StackConfig>) {
    this.#canvasWrapper = canvasWrapper;
    this.#stackCount = rodCount;

    this.initializeStacks(rodConfig);
  }

  draw() {
    this.#stacks.forEach((stack) => stack.draw());
  }

  getStack(stackIndex: number): Stack {
    if (stackIndex >= this.#stacks.length) {
      console.error('Stack not found. Index out of bounds');
      throw new Error('Stack not found. Index out of bounds');
    }
    return this.#stacks[stackIndex];
  }

  private initializeStacks(rodConfig: Partial<StackConfig>) {
    const cw = this.#canvasWrapper.width;
    const ch = this.#canvasWrapper.height;
    const stackCount = this.#stackCount;

    this.#baseWidth = cw / (stackCount + 1);
    const stackHeight = rodConfig?.height ?? ch / 2;
    const color = rodConfig?.color ?? 'black';
    const thickness = rodConfig?.thickness ?? ch * 0.02;
    const baseY = Math.floor((this.#canvasWrapper.height * 4) / 5);

    const baseXPositionsOffset = Array.from(range(0, stackCount - 1)).map(
      (index) => 100 * (1 / (stackCount * 2) + index / stackCount)
    );

    baseXPositionsOffset.forEach((offset) => {
      this.#stacks.push(
        new Stack(this.#canvasWrapper, {
          baseWidth: this.#baseWidth,
          height: stackHeight,
          color: color,
          thickness: thickness,
          baseCenterPosition: rodConfig?.baseCenterPosition ?? {
            x: Math.floor((cw * offset) / 100),
            y: baseY,
          },
        })
      );
    });
  }
}
