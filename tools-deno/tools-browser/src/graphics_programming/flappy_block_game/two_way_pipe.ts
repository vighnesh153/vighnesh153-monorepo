import { randomIntegerBetween } from "@std/random";
import type { CanvasWrapper } from "../canvas_wrapper.ts";

interface TwoWayPipeOptions {
  verticalPadding: number;
  color?: string;
  width?: number;
  minimumPipeHeight?: number;
  spaceBetweenPipes?: number;
  initialHorizontalOffset?: number;
  speed?: number;
}

export class TwoWayPipe {
  readonly canvasWrapper: CanvasWrapper;

  readonly color: string;
  readonly width: number;
  readonly verticalPadding: number;
  readonly minimumPipeHeight: number;
  readonly spaceBetweenPipes: number;
  readonly speed: number;

  readonly topPipeHeight: number;
  readonly bottomPipeHeight: number;

  readonly initialHorizontalOffset: number;

  private defeated = false;
  private x: number;

  constructor(canvasWrapper: CanvasWrapper, options: TwoWayPipeOptions) {
    this.canvasWrapper = canvasWrapper;

    this.verticalPadding = options.verticalPadding;
    this.color = options.color ?? "blue";
    this.width = options.width ?? 30;
    this.minimumPipeHeight = options.minimumPipeHeight ?? 30;
    this.spaceBetweenPipes = options.spaceBetweenPipes ?? 100;
    this.speed = options.speed ?? 2;

    this.topPipeHeight = this.getRandomTopPipeHeight();
    this.bottomPipeHeight = canvasWrapper.height - 2 * this.verticalPadding -
      this.topPipeHeight - this.spaceBetweenPipes;

    this.initialHorizontalOffset = options.initialHorizontalOffset ?? 100;
    this.x = canvasWrapper.width + this.initialHorizontalOffset;
  }

  getX(): number {
    return this.x;
  }

  draw(): void {
    const cw = this.canvasWrapper;
    const { color, width, verticalPadding, topPipeHeight, bottomPipeHeight } =
      this;

    // top pipe
    cw.drawFilledRect(this.x, verticalPadding, width, topPipeHeight, color);

    // bottom pipe
    cw.drawFilledRect(
      this.x,
      cw.height - verticalPadding - bottomPipeHeight,
      width,
      bottomPipeHeight,
      color,
    );
  }

  update(): void {
    this.x -= this.speed;
  }

  isDefeated(): boolean {
    return this.defeated;
  }

  defeat(): void {
    this.defeated = true;
  }

  private getRandomTopPipeHeight(): number {
    const maxAvailableHeight = this.canvasWrapper.height -
      this.verticalPadding * 2;
    return randomIntegerBetween(
      this.minimumPipeHeight,
      maxAvailableHeight - this.minimumPipeHeight - this.spaceBetweenPipes,
    );
  }
}
