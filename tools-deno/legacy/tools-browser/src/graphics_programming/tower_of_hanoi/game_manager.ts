import type { TowerOfHanoiGame } from "./game.ts";

export class TowerOfHanoiGameManager {
  #game: TowerOfHanoiGame;

  constructor(game: TowerOfHanoiGame) {
    this.#game = game;
  }

  *start(): Generator<unknown, void, unknown> {
    yield* this.#game.start();
  }

  stop() {
    this.#game.stop();
  }
}
