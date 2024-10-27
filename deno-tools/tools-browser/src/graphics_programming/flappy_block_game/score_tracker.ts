export class ScoreTracker {
  #score = 0;

  get score(): number {
    return this.#score;
  }

  increment() {
    this.#score++;
  }

  reset() {
    this.#score = 0;
  }
}
