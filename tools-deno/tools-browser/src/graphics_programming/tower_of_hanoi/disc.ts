import type { CanvasWrapper } from "../canvas_wrapper.ts";
import { fixedPosition, type Position } from "./position.ts";

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

  get thickness(): number {
    return this.#config.thickness;
  }

  get center(): Position {
    return {
      ...this.#config.center,
    };
  }

  set center(newValue: Position) {
    this.#config.center = { ...newValue };
  }

  get borderConfig(): DiscConfig["border"] {
    return { ...this.#config.border };
  }

  constructor(
    canvasWrapper: CanvasWrapper,
    config: Omit<DiscConfig, "center"> & { center?: Position },
  ) {
    this.#canvasWrapper = canvasWrapper;
    this.#config = {
      ...config,
      center: config.center ?? fixedPosition,
    };
  }

  draw() {
    const { center, width, thickness, color, border } = this.#config;

    const topLeftX = center.x - width / 2;
    const topLeftY = center.y - thickness / 2;

    this.#canvasWrapper.drawFilledRect(
      topLeftX,
      topLeftY,
      width,
      thickness,
      color,
    );
    this.#canvasWrapper.drawOutlinedRect(
      topLeftX,
      topLeftY,
      width,
      thickness,
      border.width,
      border.color,
    );
  }
}
