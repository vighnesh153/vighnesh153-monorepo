import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { Particle } from "./Particle.ts";
import { createPosition, Position } from "./Position.ts";
import { Bond } from "./Bond.ts";
import { euclidianDistance } from "./euclidian-distance.ts";

interface GameOptions {
  mouseDeflectionDistance?: number;

  particleCount?: number;
  particleColor?: string;
  particleRadius?: number;

  bondColor?: {
    r: number;
    g: number;
    b: number;
  };
}

export class BondingParticlesGame {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #mouseDeflectionDistance: number;

  readonly #particles: Particle[] = [];
  readonly #bonds: Bond[] = [];

  #mousePosition: Position | null = null;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;

    this.#mouseDeflectionDistance = options.mouseDeflectionDistance ?? 150;

    // create particles
    for (let i = 1; i <= (options.particleCount ?? 70); i++) {
      this.#particles.push(
        new Particle(canvasWrapper, {
          radius: options.particleRadius ?? 3,
          color: options.particleColor ?? "black",
          position: createPosition(
            canvasWrapper.rectWidth,
            canvasWrapper.rectHeight,
          ),
        }),
      );
    }

    // create bonds between particles
    for (let i = 0; i < this.#particles.length; i++) {
      for (let j = i + 1; j < this.#particles.length; j++) {
        const particle1 = this.#particles[i];
        const particle2 = this.#particles[j];

        this.#bonds.push(
          new Bond(canvasWrapper, {
            particle1,
            particle2,
            bondColor: options.bondColor ?? {
              r: 0,
              g: 0,
              b: 0,
            },
          }),
        );
      }
    }
  }

  *start() {
    while (true) {
      this.clearScreen();
      this.update();
      this.draw();
      yield;
    }
  }

  updateMousePosition(newPosition: Position): void {
    this.#mousePosition = { ...newPosition };
  }

  private clearScreen() {
    const { rectWidth, rectHeight } = this.#canvasWrapper;
    this.#canvasWrapper.context.clearRect(0, 0, rectWidth, rectHeight);
  }

  private update() {
    this.updateParticles();
    this.deflectParticlesBasedOnMousePosition();
  }

  private updateParticles() {
    for (const particle of this.#particles) {
      particle.update();
    }
  }

  /**
   * ![Proof](https://i.imgur.com/lQwHCzS.jpg)
   *
   * mx, my -> Mouse coordinates
   * px, py -> Particle coordinates
   * sx, sy -> Particle coordinates after deflection
   */
  private deflectParticlesBasedOnMousePosition(): void {
    if (this.#mousePosition === null) {
      return;
    }

    const r = this.#mouseDeflectionDistance;
    const mx = this.#mousePosition.x;
    const my = this.#mousePosition.y;

    for (const particle of this.#particles) {
      const px = particle.position.x;
      const py = particle.position.y;

      const d = euclidianDistance([mx, my], [px, py]);

      // if "d" is close to 0 or greater than "r", don't deflect the point
      if (d < 1 || d >= r) continue;

      const sx = px + ((px - mx) * (r - d)) / d;
      const sy = py + ((py - my) * (r - d)) / d;

      particle.position = {
        x: sx,
        y: sy,
      };
    }
  }

  private draw() {
    this.drawParticles();
    this.drawBonds();
  }

  private drawParticles() {
    for (const particle of this.#particles) {
      particle.draw();
    }
  }

  private drawBonds() {
    for (const bond of this.#bonds) {
      bond.draw();
    }
  }
}
