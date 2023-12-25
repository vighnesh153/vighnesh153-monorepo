import { CanvasWrapper } from '@/canvas-wrapper';
import { ScoreTracker } from './ScoreTracker';
import { Screen } from './Screen';

interface InfoScreenOptions {
  scoreTracker: ScoreTracker;
  changeScreen(): void;

  color?: string;
  scoreColor?: string;
  scoreFontSize?: number;
}

export class InfoScreen implements Screen {
  readonly type = 'info';
  readonly canvasWrapper: CanvasWrapper;

  readonly changeScreen: () => void;

  readonly scoreTracker: ScoreTracker;
  readonly scoreColor: string;
  readonly scoreFontSize: number;

  readonly color: string;

  constructor(canvasWrapper: CanvasWrapper, options: InfoScreenOptions) {
    this.canvasWrapper = canvasWrapper;

    this.changeScreen = options.changeScreen;

    this.scoreTracker = options.scoreTracker;
    this.scoreColor = options.scoreColor ?? 'green';
    this.scoreFontSize = options.scoreFontSize ?? 15;

    this.color = options.color ?? 'black';
  }

  draw(): void {
    this.drawScore();
    this.drawInfo();
  }

  private drawScore(): void {
    const cw = this.canvasWrapper;
    const w = cw.width;
    const h = cw.height;
    const color = this.scoreColor;
    const fontSize = this.scoreFontSize;

    const scoreText = `Your score: ${this.scoreTracker.score}`;

    cw.writeText(scoreText, w / 2 - (scoreText.length * fontSize) / 4, h / 2 - fontSize / 2, color, fontSize);
  }

  private drawInfo(): void {
    const cw = this.canvasWrapper;
    const w = cw.width;
    const h = cw.height;
    const { color } = this;
    const fontSize = this.scoreFontSize;

    const infoText = `Hit 'Enter' to start the game and 'SPACEBAR' to jump`;

    cw.writeText(infoText, w / 2 - (infoText.length * fontSize) / 5, h / 2 + 40, color, fontSize);
  }

  update(): void {
    // nothing to update here
  }

  handleSpacebarPress(): void {
    // do nothing
  }

  handleEnterPress(): void {
    this.changeScreen();
  }
}
