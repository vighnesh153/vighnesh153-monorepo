import { not } from "@vighnesh153/tools";
import type { GridPathFinderGame } from "./game.ts";

export class GridPathFinderGameManager {
  #game: GridPathFinderGame;

  get isRunning(): boolean {
    return this.#game.isRunning;
  }

  constructor(game: GridPathFinderGame) {
    this.#game = game;
  }

  randomize(game: GridPathFinderGame) {
    this.#game.stop();
    this.#game = game;
  }

  *solve(): Generator<undefined, void, unknown> {
    const frames = this.#game.solve();
    while (not(frames.next().done)) {
      yield;
    }
  }
}
