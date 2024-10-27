export class BarnsleysFernGenerator {
  #x = 0;
  #y = 0;

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  generateNext(): void {
    const r = Math.random();
    let nextX;
    let nextY;

    if (r < 0.01) {
      nextX = 0;
      nextY = 0.16 * this.#y;
    } else if (r < 0.86) {
      nextX = 0.85 * this.#x + 0.04 * this.#y;
      nextY = -0.04 * this.#x + 0.85 * this.#y + 1.6;
    } else if (r < 0.93) {
      nextX = 0.2 * this.#x - 0.26 * this.#y;
      nextY = 0.23 * this.#x + 0.22 * this.#y + 1.6;
    } else {
      nextX = -0.15 * this.#x + 0.28 * this.#y;
      nextY = 0.26 * this.#x + 0.24 * this.#y + 0.44;
    }

    this.#x = nextX;
    this.#y = nextY;
  }
}
