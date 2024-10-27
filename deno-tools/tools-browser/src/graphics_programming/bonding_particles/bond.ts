import type { CanvasWrapper } from "../canvas_wrapper.ts";
import type { Particle } from "./particle.ts";
import { calculateStrength, type Strength } from "./strength.ts";

const StrengthToBondColorOpacity: Record<Strength, number> = {
  NIL: 0,
  XS: 0.03,
  S: 0.1,
  M: 0.2,
  L: 0.4,
  XL: 1,
};

interface BondOptions {
  particle1: Particle;
  particle2: Particle;
  bondColor: {
    r: number;
    g: number;
    b: number;
  };
}

export class Bond {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #options: BondOptions;

  constructor(canvasWrapper: CanvasWrapper, options: BondOptions) {
    this.#canvasWrapper = canvasWrapper;
    this.#options = options;
  }

  draw() {
    const pos1 = this.#options.particle1.position;
    const pos2 = this.#options.particle2.position;
    const strength = calculateStrength(pos1, pos2);
    const colorOpacity = StrengthToBondColorOpacity[strength];
    const { r, g, b } = this.#options.bondColor;
    const color = `rgba(${r},${g},${b},${colorOpacity})`;
    if (colorOpacity !== 0) {
      this.#canvasWrapper.drawLine(pos1.x, pos1.y, pos2.x, pos2.y, 2, color);
    }
  }
}
