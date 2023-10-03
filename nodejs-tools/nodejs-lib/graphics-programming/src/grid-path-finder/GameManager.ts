import { not } from '@vighnesh153/utils';
import { Game } from './Game';

export class GameManager {
  #game: Game;

  get isRunning() {
    return this.#game.isRunning;
  }

  constructor(game: Game) {
    this.#game = game;
  }

  randomize(game: Game) {
    this.#game.stop();
    this.#game = game;
  }

  *solve() {
    const frames = this.#game.solve();
    while (not(frames.next().done)) {
      yield;
    }
  }
}
