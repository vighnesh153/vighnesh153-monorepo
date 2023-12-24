import { CanvasWrapper } from '@/canvas-wrapper';
import { Point } from './Point';

interface Velocity {
  dx: number;
  dy: number;
}

interface VelocityModifier {
  horizontal: number;
  vertical: number;
}

interface BallOptions {
  color?: string;
  width?: number;
  height?: number;
  arenaGutter: number;
}

type CollisionDirection = 'left' | 'right';

export class Ball {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #color: string;
  readonly #width: number;
  readonly #height: number;
  readonly #position: Point;
  readonly #arenaGutter: number;

  readonly #velocity: Velocity;
  #velocityModifier: VelocityModifier = {
    horizontal: 1,
    vertical: 1,
  };

  get position(): Point {
    return { ...this.#position };
  }

  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  constructor(canvasWrapper: CanvasWrapper, options: BallOptions) {
    this.#canvasWrapper = canvasWrapper;
    this.#color = options.color ?? 'black';
    this.#width = options.width ?? 10;
    this.#height = options.height ?? 10;
    this.#arenaGutter = options.arenaGutter;
    this.#position = {
      x: (canvasWrapper.width - this.#width) / 2,
      y: (canvasWrapper.height - this.#height) / 2,
    };
    this.#velocity = { dx: 5, dy: 4 };
  }

  draw() {
    const cw = this.#canvasWrapper;
    const { x, y } = this.#position;
    const w = this.#width;
    const h = this.#height;
    const color = this.#color;
    cw.drawFilledRect(x, y, w, h, color);
  }

  update(onCollision: (direction: CollisionDirection) => void) {
    this.#position.x += this.#velocity.dx * this.#velocityModifier.horizontal;
    this.#position.y += this.#velocity.dy * this.#velocityModifier.vertical;

    this.coerce(onCollision);
  }

  setVelocityModifier(horizontal: number, vertical: number) {
    this.#velocityModifier.horizontal = horizontal;
    this.#velocityModifier.vertical = vertical;
  }

  updateVelocityModifier(horizontal: number, vertical: number) {
    this.#velocityModifier.horizontal *= horizontal;
    this.#velocityModifier.vertical *= vertical;
  }

  private coerce(onCollision: (direction: CollisionDirection) => void) {
    if (this.#position.x < this.#arenaGutter) {
      this.#position.x = this.#arenaGutter;
      this.#velocityModifier.horizontal *= -1;
      onCollision('left');
    }
    if (this.#position.y < this.#arenaGutter) {
      this.#position.y = this.#arenaGutter;
      this.#velocityModifier.vertical *= -1;
    }
    if (this.#position.x + this.#width > this.#canvasWrapper.width - this.#arenaGutter) {
      this.#position.x = this.#canvasWrapper.width - this.#arenaGutter - this.#width;
      this.#velocityModifier.horizontal *= -1;
      onCollision('right');
    }
    if (this.#position.y + this.#height > this.#canvasWrapper.height - this.#arenaGutter) {
      this.#position.y = this.#canvasWrapper.height - this.#arenaGutter - this.#height;
      this.#velocityModifier.vertical *= -1;
    }
  }
}
