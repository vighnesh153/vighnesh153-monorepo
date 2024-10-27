import type { CanvasWrapper } from "../canvas_wrapper.ts";

interface BallOptions {
  readonly size?: number;
  readonly color?: string;
  readonly coordinate: Coordinate;
  readonly velocity?: Velocity;
}

interface Coordinate {
  x: number;
  y: number;
}

interface Velocity {
  dx: number;
  dy: number;
}

export class Ball {
  readonly size: number;
  readonly color: string;
  readonly coordinate: Coordinate;
  readonly velocity: Velocity;

  constructor(
    private readonly canvasWrapper: CanvasWrapper,
    options: BallOptions,
  ) {
    this.coordinate = options.coordinate;
    this.size = options.size ?? 5;
    this.color = options.color ?? "black";
    this.velocity = options.velocity ?? {
      dx: 5,
      dy: -5,
    };
  }

  draw(): void {
    const {
      canvasWrapper,
      coordinate: { x, y },
      color,
      size,
    } = this;
    canvasWrapper.drawFilledRect(x, y, size, size, color);
  }

  update(): void {
    this.coordinate.x += this.velocity.dx;
    this.coordinate.y += this.velocity.dy;
  }

  flipVelocityX(): void {
    this.velocity.dx *= -1;
  }

  flipVelocityY(): void {
    this.velocity.dy *= -1;
  }
}
