import { CanvasWrapper } from "@/canvas-wrapper.ts";

interface PaddleOptions {
  readonly width?: number;
  readonly height?: number;
  readonly color?: string;

  readonly initialX?: number;
  readonly y: number;
}

export class Paddle {
  readonly width: number;
  readonly height: number;
  readonly color: string;
  readonly y: number;

  x: number;

  constructor(
    private readonly canvasWrapper: CanvasWrapper,
    options: PaddleOptions,
  ) {
    this.width = options.width ?? canvasWrapper.width / 5;
    this.height = options.height ?? 3;
    this.color = options.color ?? "black";

    this.x = options.initialX ?? (canvasWrapper.width - this.width) / 2;
    this.y = options.y;
  }

  draw(): void {
    const { width, height, color, x, y, canvasWrapper } = this;

    canvasWrapper.drawFilledRect(x, y, width, height, color);
  }

  updateX(x: number): void {
    this.x = x;
    this.coerceX();
  }

  private coerceX(): void {
    this.x = Math.max(0, this.x);
    this.x = Math.min(this.canvasWrapper.width - this.width, this.x);
  }
}
