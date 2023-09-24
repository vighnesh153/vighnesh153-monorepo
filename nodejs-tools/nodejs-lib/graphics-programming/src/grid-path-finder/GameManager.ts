import { Game } from './Game';

export class GameManager {
  constructor(private game: Game) {}

  start() {
    this.game.start();
  }

  stop() {
    this.game.stop();
  }

  solve() {
    //
  }
}
