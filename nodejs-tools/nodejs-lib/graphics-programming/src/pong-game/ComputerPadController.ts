import { Ball } from "./Ball.ts";
import { Pad } from "./Pad.ts";

interface ComputerPadControllerConfig {
  computerPad: Pad;
  ball: Ball;
  speed?: number;
}

export class ComputerPadController {
  readonly #computerPad: Pad;
  readonly #ball: Ball;
  readonly #speed: number;

  constructor(config: ComputerPadControllerConfig) {
    this.#computerPad = config.computerPad;
    this.#ball = config.ball;
    this.#speed = config.speed ?? 2;
  }

  followBall() {
    const pad = this.#computerPad;
    const ball = this.#ball;
    const speed = this.#speed;
    const padMidY = pad.position.y + pad.height / 2;

    if (padMidY > ball.position.y) {
      pad.patchPosition(-speed);
    } else if (padMidY < ball.position.y) {
      pad.patchPosition(speed);
    } else {
      // do nothing
    }
  }
}
