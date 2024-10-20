import { randomIntegerBetween } from '@std/random';
import { CanvasWrapper } from '@/canvas-wrapper.ts';

interface StarColor {
  r: number;
  g: number;
  b: number;
}

interface StarOptions {
  color?: StarColor;
  velocityMultiplier?: number;
}

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  dx: number;
  dy: number;
}

export class Star {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #color: StarColor;
  readonly #radius = randomIntegerBetween(2, 5);
  readonly #position: Position;
  readonly #velocity: Velocity;

  #opacity: number;
  #dOpacity: number;

  constructor(canvasWrapper: CanvasWrapper, options: StarOptions = {}) {
    this.#canvasWrapper = canvasWrapper;
    const velocityMultiplier = options.velocityMultiplier ?? 0.25;

    this.#color = options.color ?? {
      r: 0,
      g: 0,
      b: 0,
    };

    this.#position = {
      x: this.coerceX(randomIntegerBetween(1, 100000)),
      y: this.coerceY(randomIntegerBetween(1, 100000)),
    };

    this.#velocity = {
      dx: randomIntegerBetween(-1, 1) * velocityMultiplier,
      dy: randomIntegerBetween(-1, 1) * velocityMultiplier,
    };

    this.#opacity = 1;
    this.#dOpacity = Math.random() / 50;
  }

  draw(): void {
    const radius = this.#radius;
    const opacity = this.#opacity;
    const { x, y } = this.#position;
    const { r, g, b } = this.#color;

    this.#canvasWrapper.drawFilledCircle(x, y, radius, `rgba(${r}, ${g}, ${b}, ${opacity})`);
  }

  update() {
    this.updatePosition();
    this.updateOpacity();
  }

  private updatePosition() {
    const pos = this.#position;
    const { dx, dy } = this.#velocity;
    pos.x = this.coerceX(pos.x + dx);
    pos.y = this.coerceY(pos.y + dy);
  }

  private updateOpacity() {
    this.#opacity += this.#dOpacity;

    if (this.#opacity >= 1) {
      this.#dOpacity = -Math.abs(this.#dOpacity);
    }
    if (this.#opacity <= 0) {
      this.#dOpacity = Math.abs(this.#dOpacity);
    }
  }

  private coerceX(x: number): number {
    const w = this.#canvasWrapper.width;
    return (w + x) % w;
  }

  private coerceY(y: number): number {
    const h = this.#canvasWrapper.height;
    return (h + y) % h;
  }
}
