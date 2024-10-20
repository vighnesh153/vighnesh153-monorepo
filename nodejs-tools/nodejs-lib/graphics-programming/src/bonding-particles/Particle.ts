import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { Position } from "./Position.ts";
import { createVelocity, Velocity } from "./velocity.ts";

interface ParticleConfig {
  radius: number;
  color: string;
  position: Position;
}

export class Particle {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #config: ParticleConfig;

  readonly #velocity: Velocity;

  get position(): Position {
    return { ...this.#config.position };
  }

  set position(newPosition: Position) {
    this.#config.position = { ...newPosition };
  }

  constructor(canvasWrapper: CanvasWrapper, config: ParticleConfig) {
    this.#canvasWrapper = canvasWrapper;
    this.#config = config;

    this.#velocity = createVelocity();
  }

  draw() {
    const { x, y } = this.#config.position;
    const { radius, color } = this.#config;
    this.#canvasWrapper.drawFilledCircle(x, y, radius, color);
  }

  update() {
    const velocity = this.#velocity;
    const { position } = this.#config;
    const { rectWidth, rectHeight } = this.#canvasWrapper;

    position.x += velocity.dx;
    position.y += velocity.dy;

    // handle out of bounds
    position.x = (position.x + rectWidth) % rectWidth;
    position.y = (position.y + rectHeight) % rectHeight;
  }
}
