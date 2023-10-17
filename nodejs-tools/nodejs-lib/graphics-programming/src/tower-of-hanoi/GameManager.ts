import { TowerOfHanoiGame } from './Game';

export class TowerOfHanoiGameManager {
  #game: TowerOfHanoiGame;

  constructor(game: TowerOfHanoiGame) {
    this.#game = game;
  }

  *start() {
    const frames = this.#game.start();
    while (!frames.next().done) {
      yield;
    }
  }

  stop() {
    this.#game.stop();
  }
}
