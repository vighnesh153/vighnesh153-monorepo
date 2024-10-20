export class ScoreTracker {
  #playerScore: number;
  #computerScore: number;
  #scoreToWin: number;

  get playerScore(): number {
    return this.#playerScore;
  }

  get computerScore(): number {
    return this.#computerScore;
  }

  get scoreToWin(): number {
    return this.#scoreToWin;
  }

  constructor(
    initialPlayerScore = 0,
    initialComputerScore = 0,
    scoreToWin = 5,
  ) {
    this.#playerScore = initialPlayerScore;
    this.#computerScore = initialComputerScore;
    this.#scoreToWin = scoreToWin;
  }

  playerScores(): void {
    this.#playerScore++;
  }

  computerScores(): void {
    this.#computerScore++;
  }
}
