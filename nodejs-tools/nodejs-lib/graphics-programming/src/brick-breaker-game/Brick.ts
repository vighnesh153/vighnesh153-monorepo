import { not } from "@vighnesh153/tools";
import { CanvasWrapper } from "@/canvas-wrapper.ts";

interface BrickOptions {
  readonly row: number;
  readonly column: number;
  readonly width: number;

  readonly height?: number;
  readonly color?: string;
  readonly endPadding?: number;

  readonly visible?: boolean;
}

export class Brick {
  readonly row: number;
  readonly column: number;

  readonly width: number;
  readonly height: number;
  readonly color: string;
  readonly endPadding: number;

  private visible: boolean;

  get isVisible(): boolean {
    return this.visible;
  }

  constructor(
    private readonly canvasWrapper: CanvasWrapper,
    options: BrickOptions,
  ) {
    this.row = options.row;
    this.column = options.column;

    this.width = options.width;
    this.height = options.height ?? 20;
    this.color = options.color ?? "blue";
    this.endPadding = options.endPadding ?? 1;
    this.visible = options.visible ?? true;
  }

  draw(): void {
    if (not(this.isVisible)) {
      return;
    }

    const { canvasWrapper, row, column, width, height, color, endPadding } =
      this;
    canvasWrapper.drawFilledRect(
      column * width,
      row * height,
      width - endPadding,
      height - endPadding,
      color,
    );
  }

  destroy(): void {
    this.visible = false;
  }
}
