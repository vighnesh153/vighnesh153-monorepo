import { CanvasWrapper } from '@/canvas-wrapper';
import { ScoreTracker } from './score-tracker';
import { Pad } from './Pad';
import { Ball } from './Ball';
import { ComputerPadController } from './ComputerPadController';

interface ArenaOptions {
  contentColor?: string;
  dangerBorderColor?: string;
  gutter?: number;
  borderThickness?: number;
  scoreTracker: ScoreTracker;
}

export class Arena {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #contentColor: string;
  readonly #gutter: number;
  readonly #borderThickness: number;
  readonly #scoreTracker: ScoreTracker;
  readonly #dangerBorderColor: string;

  readonly #playerPad: Pad;
  readonly #computerPad: Pad;
  readonly #computerPadController: ComputerPadController;

  readonly #ball: Ball;

  constructor(canvasWrapper: CanvasWrapper, options: ArenaOptions) {
    this.#canvasWrapper = canvasWrapper;
    this.#contentColor = options.contentColor ?? 'black';
    this.#dangerBorderColor = options.dangerBorderColor ?? 'red';
    this.#gutter = options.gutter ?? 20;
    this.#borderThickness = options.borderThickness ?? 2;
    this.#scoreTracker = options.scoreTracker;

    const padWidth = 5;
    this.#playerPad = new Pad(canvasWrapper, { color: this.#contentColor, width: padWidth });
    this.#computerPad = new Pad(canvasWrapper, {
      width: padWidth,
      boundStart: { x: canvasWrapper.width - this.#gutter - padWidth },
      boundEnd: { x: canvasWrapper.width - this.#gutter - padWidth },
      color: this.#contentColor,
    });

    this.#ball = new Ball(canvasWrapper, { color: this.#contentColor, arenaGutter: this.#gutter });

    this.#computerPadController = new ComputerPadController({
      ball: this.#ball,
      computerPad: this.#computerPad,
    });

    canvasWrapper.canvasElement.addEventListener('mousemove', (e) => {
      this.handleMouseHover(e);
    });
  }

  draw() {
    this.drawBorders();
    this.drawPads();
    this.drawBall();
  }

  update() {
    this.updateBall();
    this.handleBallCollisionWithPads();
    this.#computerPadController.followBall();
  }

  private drawPads() {
    this.#playerPad.draw();
    this.#computerPad.draw();
    this.writeScore();
  }

  private drawBall() {
    this.#ball.draw();
  }

  private drawBorders() {
    const p = this.#gutter;
    const w = this.#canvasWrapper.width;
    const h = this.#canvasWrapper.height;
    const thickness = this.#borderThickness;
    const color = this.#contentColor;
    this.#canvasWrapper.drawOutlinedRect(p, p, w - p * 2, h - p * 2, thickness, color);

    this.#canvasWrapper.drawLine(p, p, p, h - p, thickness, this.#dangerBorderColor);
    this.#canvasWrapper.drawLine(w - p, p, w - p, h - p, thickness, this.#dangerBorderColor);
  }

  private writeScore() {
    const text1 = `Player score: ${this.#scoreTracker.playerScore}`;
    const text2 = `AI score: ${this.#scoreTracker.computerScore}`;
    // const text3 = `${this.#scoreTracker.scoreToWin} TO WIN`;

    const cw = this.#canvasWrapper;
    const fontSize = this.#gutter * 0.75;
    const posY = this.#gutter * 0.75;
    const textLengthMultiplier = 6.5;

    cw.writeText(text1, this.#gutter, posY, this.#contentColor, fontSize);
    cw.writeText(
      text2,
      this.#canvasWrapper.width - this.#gutter - text2.length * textLengthMultiplier,
      posY,
      this.#contentColor,
      fontSize
    );
    // cw.writeText(
    //   text3,
    //   this.#canvasWrapper.width / 2 - (text2.length * textLengthMultiplier) / 2,
    //   posY,
    //   this.#contentColor,
    //   fontSize
    // );
  }

  private updateBall() {
    this.#ball.update((collisionDirection) => {
      if (collisionDirection === 'left') {
        this.#scoreTracker.computerScores();
      } else if (collisionDirection === 'right') {
        this.#scoreTracker.playerScores();
      }
    });
  }

  private handleBallCollisionWithPads(): void {
    const ball = this.#ball;
    const playerPad = this.#playerPad;
    const computerPad = this.#computerPad;

    // collision with player's pad
    {
      const xInRangePlayerPad = ball.position.x <= playerPad.position.x + playerPad.width;
      const yInRangePlayerPad =
        ball.position.y >= playerPad.position.y && ball.position.y <= playerPad.position.y + playerPad.height;

      if (xInRangePlayerPad && yInRangePlayerPad) {
        ball.updateVelocityModifier(-1, 1);
      }
    }

    // collision with computer's pad
    {
      const xInRangePlayerPad = ball.position.x + ball.width >= computerPad.position.x;
      const yInRangePlayerPad =
        ball.position.y >= computerPad.position.y && ball.position.y <= computerPad.position.y + computerPad.height;

      if (xInRangePlayerPad && yInRangePlayerPad) {
        ball.updateVelocityModifier(-1, 1);
      }
    }
  }

  private handleMouseHover(e: MouseEvent) {
    const { rect } = this.#canvasWrapper;
    const mouseY = e.clientY - rect.top - document.documentElement.scrollTop;

    // we subtract y to align the mouse position with pad's center
    const playerPadY = mouseY - this.#playerPad.height / 2;

    this.#playerPad.setPosition(playerPadY);
  }
}
