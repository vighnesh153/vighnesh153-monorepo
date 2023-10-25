import { CanvasWrapper } from '@/canvas-wrapper';
import { Particle } from './Particle';
import { Position, createPosition } from './Position';
import { Bond } from './Bond';
import { euclidianDistance } from './euclidian-distance';

interface GameOptions {
  mouseDeflectionDistance?: number;
}

export class BondingParticlesGame {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #mouseDeflectionDistance: number;

  readonly #particles: Particle[] = [];
  readonly #bonds: Bond[] = [];

  // #mousePosition: Position | null = null;
  #mousePosition: Position | null = {
    x: 100,
    y: 100,
  };

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;

    this.#mouseDeflectionDistance = options.mouseDeflectionDistance ?? 200;

    // for (let i = 0; i < 50; i++) {
    for (let i = 0; i < 1; i++) {
      this.#particles.push(
        new Particle(canvasWrapper, {
          radius: 3,
          color: ['violet', 'purple'][Math.floor(Math.random() * 2)],
          position: createPosition(canvasWrapper.rectWidth, canvasWrapper.rectHeight),
        })
      );
    }

    for (let i = 0; i < this.#particles.length; i++) {
      for (let j = i + 1; j < this.#particles.length; j++) {
        const particle1 = this.#particles[i];
        const particle2 = this.#particles[j];

        this.#bonds.push(
          new Bond(canvasWrapper, {
            particle1,
            particle2,
            bondColor: {
              r: 0,
              g: 0,
              b: 0,
            },
          })
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

      particle.position.x = sx;
      particle.position.y = sy;
    }
  }

  private draw() {
    this.drawParticles();
    this.drawBonds();

    if (this.#mousePosition !== null) {
      this.#canvasWrapper.drawFilledCircle(this.#mousePosition.x, this.#mousePosition.y, 2, 'red');
      this.#canvasWrapper.drawFilledCircle(
        this.#mousePosition.x,
        this.#mousePosition.y,
        this.#mouseDeflectionDistance,
        'rgba(255,0,0,0.2)'
      );
    }
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
