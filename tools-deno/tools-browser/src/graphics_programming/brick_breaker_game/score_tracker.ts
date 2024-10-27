export class ScoreTracker {
  private score = 0;

  getScore(): number {
    return this.score;
  }

  increment(): void {
    this.score++;
  }

  reset(): void {
    this.score = 0;
  }
}
