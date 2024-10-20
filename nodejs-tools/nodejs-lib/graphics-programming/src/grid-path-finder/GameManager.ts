import { not } from "@vighnesh153/tools";
import { GridPathFinderGame } from "./Game.ts";

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
