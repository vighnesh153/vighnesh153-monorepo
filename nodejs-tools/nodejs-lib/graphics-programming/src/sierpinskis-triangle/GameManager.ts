import { SierpinskisTriangleGame } from './Game.ts';

export class SierpinskisTriangleGameManager {
  readonly #game: SierpinskisTriangleGame;

  constructor(game: SierpinskisTriangleGame) {
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
