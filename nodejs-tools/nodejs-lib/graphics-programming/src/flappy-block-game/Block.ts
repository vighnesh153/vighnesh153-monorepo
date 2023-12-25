import { CanvasWrapper } from '@/canvas-wrapper';

interface BlockConfig {
  readonly coordinate: Coordinate;

  readonly color?: string;
  readonly width?: number;
  readonly height?: number;
  readonly velocity?: number;
  readonly jumpVelocity?: number;
  readonly gravity?: number;
}

interface Coordinate {
  x: number;
  y: number;
}

export class Block {
  readonly canvasWrapper: CanvasWrapper;

  readonly color: string;
  readonly width: number;
  readonly height: number;
  readonly jumpVelocity: number;
  readonly gravity: number;

  private coordinate: Coordinate;
  private velocity: number;

  get x(): number {
    return this.coordinate.x;
  }

  get y(): number {
    return this.coordinate.y;
  }

  constructor(canvasWrapper: CanvasWrapper, options: BlockConfig) {
    this.canvasWrapper = canvasWrapper;

    this.color = options.color ?? 'red';
    this.width = options.width ?? 20;
    this.height = options.width ?? 20;
    this.velocity = options.velocity ?? 0;
    this.jumpVelocity = options.jumpVelocity ?? -4;
    this.gravity = options.gravity ?? 0.2;

    this.coordinate = options.coordinate;
  }

  draw(): void {
    const cw = this.canvasWrapper;
    const {
      color,
      width,
      height,
      coordinate: { x, y },
    } = this;

    cw.drawFilledRect(x, y, width, height, color);
  }

  update(): void {
    this.coordinate.y += this.velocity;
    this.velocity += this.gravity;
  }

  handleSpacebarPress(): void {
    this.velocity = this.jumpVelocity;
  }
}
