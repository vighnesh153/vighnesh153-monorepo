import type { TowerOfHanoiGame } from "./game.ts";

export class TowerOfHanoiGameManager {
  #game: TowerOfHanoiGame;

  constructor(game: TowerOfHanoiGame) {
    this.#game = game;
  }

  *start() {
    yield* this.#game.start();
  }

  stop() {
    this.#game.stop();
  }
}
