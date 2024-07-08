import { not } from '@vighnesh153/tools-platform-independent';
import { GridPathFinderGame } from './Game';

export class GridPathFinderGameManager {
  #game: GridPathFinderGame;

  get isRunning() {
    return this.#game.isRunning;
  }

  constructor(game: GridPathFinderGame) {
    this.#game = game;
  }

  randomize(game: GridPathFinderGame) {
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
