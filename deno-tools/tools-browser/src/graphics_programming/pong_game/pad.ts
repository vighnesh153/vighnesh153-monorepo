import type { CanvasWrapper } from "../canvas_wrapper.ts";
import type { Point } from "./point.ts";

interface PadOptions {
  color?: string;
  width?: number;
  height?: number;
  boundStart?: Partial<Point>;
  boundEnd?: Partial<Point>;
  arenaGutter?: number;
}

export class Pad {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #color: string;
  readonly #width: number;
  readonly #height: number;
  readonly #arenaGutter: number;

  readonly #boundStart: Point;
  readonly #boundEnd: Point;

  #currentPosition: Point;

  get position(): Point {
    return { ...this.#currentPosition };
  }

  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  constructor(canvasWrapper: CanvasWrapper, options: PadOptions) {
    this.#canvasWrapper = canvasWrapper;
    this.#color = options.color ?? "black";
    this.#width = options.width ?? 10;
    this.#height = options.height ?? canvasWrapper.height / 4;
    this.#arenaGutter = options.arenaGutter ?? 20;
    this.#boundStart = {
      x: this.#arenaGutter,
      y: this.#arenaGutter,
      ...options.boundStart,
    };
    this.#boundEnd = {
      x: this.#arenaGutter,
      y: canvasWrapper.height - this.#arenaGutter,
      ...options.boundEnd,
    };
    this.#currentPosition = {
      x: (this.#boundStart.x + this.#boundEnd.x) / 2,
      y: (this.#boundStart.y + this.#boundEnd.y - this.#height) / 2,
    };
  }

  draw() {
    const cw = this.#canvasWrapper;
    const { x, y } = this.#currentPosition;
    const w = this.#width;
    const h = this.#height;
    const color = this.#color;
    cw.drawFilledRect(x, y, w, h, color);
  }

  setPosition(y: number): void {
    this.#currentPosition.y = y;
    this.coercePosition();
  }

  patchPosition(y: number): void {
    this.#currentPosition.y += y;
    this.coercePosition();
  }

  private coercePosition(): void {
    const pos = this.#currentPosition;
    pos.y = Math.max(this.#boundStart.y, pos.y);
    pos.y = Math.min(this.#boundEnd.y - this.height, pos.y);
  }
}
