import { CanvasWrapper } from '@/canvas-wrapper.ts';
import { randomColor } from './randomColor.ts';

interface Options {
  /**
   * In degrees
   */
  angle?: number;

  thickness?: number;
  color?: string;
  scaleDownFactor?: number;
  initialLength?: number;
  lengthThreshold?: number;
}

export class SymmetricBinaryTreeGame {
  #canvasWrapper: CanvasWrapper;

  readonly #thickness: number;
  readonly #color: string;
  readonly #scaleDownFactor: number;
  readonly #initialLength: number;
  readonly #lengthThreshold: number;
  #angle: number;
  #chaos = false;

  constructor(canvasWrapper: CanvasWrapper, options: Options = {}) {
    this.#canvasWrapper = canvasWrapper;
    const h = this.#canvasWrapper.getBoundingClientRect().height;

    this.#angle = ((options.angle ?? 40) * Math.PI) / 180;
    this.#thickness = options.thickness ?? 3;
    this.#color = options.color ?? 'black';
    this.#scaleDownFactor = options.scaleDownFactor ?? 0.7;
    this.#initialLength = options.initialLength ?? h * 0.3;
    this.#lengthThreshold = options.lengthThreshold ?? 3;

    this.draw();
  }

  update(newAngle: number, chaos: boolean) {
    this.#angle = newAngle;
    this.#chaos = chaos;

    this.draw();
  }

  draw() {
    const w = this.#canvasWrapper.width;
    const h = this.#canvasWrapper.height;
    const x = w / 2;
    const y = h;
    this.#canvasWrapper.context.clearRect(0, 0, w, h);

    this.recursivelyBranch(x, y, this.#initialLength);
  }

  private recursivelyBranch(x: number, y: number, length: number) {
    if (length < this.#lengthThreshold) return;

    const thickness = this.#thickness;
    const color = this.#chaos ? randomColor() : this.#color;
    const scaleDownFactor = this.#scaleDownFactor;

    this.#canvasWrapper.drawLine(x, y, x, y - length, thickness, color);

    [-this.wrapAngle(), this.wrapAngle()].forEach((angle) => {
      this.#canvasWrapper.pushState();
      this.#canvasWrapper.translate(0, -length);
      this.#canvasWrapper.translate(x, y);
      this.#canvasWrapper.rotate(angle);
      this.#canvasWrapper.translate(-x, -y);
      this.recursivelyBranch(x, y, length * scaleDownFactor);
      this.#canvasWrapper.popState();
    });
  }

  private wrapAngle(): number {
    return this.#chaos ? this.#angle + Math.random() : this.#angle;
  }
}
