import type { SierpinskisTriangleGame } from "./game.ts";

export class SierpinskisTriangleGameManager {
  readonly #game: SierpinskisTriangleGame;

  constructor(game: SierpinskisTriangleGame) {
    this.#game = game;
  }

  *start(): Generator<undefined, void, unknown> {
    const frames = this.#game.start();

    while (!frames.next().done) {
      yield;
    }
  }

  stop() {
    this.#game.stop();
  }
}
