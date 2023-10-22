import { TowerOfHanoiGame } from './Game';

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
