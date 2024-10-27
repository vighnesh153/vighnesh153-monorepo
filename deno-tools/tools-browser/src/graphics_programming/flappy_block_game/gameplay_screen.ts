import { Queue } from "@vighnesh153/tools";
import type { CanvasWrapper } from "../canvas_wrapper.ts";
import type { Screen } from "./screen.ts";
import type { ScoreTracker } from "./score_tracker.ts";
import { TwoWayPipe } from "./two_way_pipe.ts";
import { Block } from "./block.ts";

interface GameplayScreenOptions {
  readonly verticalPadding: number;
  readonly scoreTracker: ScoreTracker;
  readonly distanceBetweenTwoPipes?: number;
  readonly blockXCoordinate?: number;
  changeScreen(): void;
  readonly scoreColor?: string;
  readonly scoreFontSize?: number;
}

export class GameplayScreen implements Screen {
  readonly type = "gameplay";
  readonly canvasWrapper: CanvasWrapper;

  readonly verticalPadding: number;
  readonly scoreColor: string;
  readonly scoreFontSize: number;

  readonly scoreTracker: ScoreTracker;
  readonly changeScreen: () => void;

  readonly distanceBetweenTwoPipes: number;

  readonly pipes: Queue<TwoWayPipe> = new Queue();
  readonly block: Block;

  constructor(canvasWrapper: CanvasWrapper, options: GameplayScreenOptions) {
    this.canvasWrapper = canvasWrapper;
    this.verticalPadding = options.verticalPadding;
    this.scoreTracker = options.scoreTracker;
    this.changeScreen = options.changeScreen;

    this.scoreColor = options.scoreColor ?? "black";
    this.scoreFontSize = options.scoreFontSize ?? 15;

    this.distanceBetweenTwoPipes = options.distanceBetweenTwoPipes ?? 100;

    this.pipes.pushRight(this.createNewTwoWayPipe());
    this.block = new Block(canvasWrapper, {
      coordinate: {
        x: options.blockXCoordinate ?? canvasWrapper.width * 0.25,
        y: canvasWrapper.height / 2,
      },
    });
  }

  draw(): void {
    this.pipes.toArray().forEach((pipe) => pipe.draw());
    this.block.draw();
    this.writeScore();
  }

  update(): void {
    this.pipes.toArray().forEach((pipe) => pipe.update());
    this.addNewPipe();
    this.prunePipes();
    this.block.update();
    this.scoreAgainstPipes();
    this.checkCollisions();
  }

  handleSpacebarPress(): void {
    this.block.handleSpacebarPress();
  }

  private addNewPipe(): void {
    const lastPipe = this.pipes.peekRight();
    if (
      lastPipe.getX() + lastPipe.initialHorizontalOffset <
        this.canvasWrapper.width
    ) {
      this.pipes.pushRight(this.createNewTwoWayPipe());
    }
  }

  private createNewTwoWayPipe(): TwoWayPipe {
    return new TwoWayPipe(this.canvasWrapper, {
      verticalPadding: this.verticalPadding,
    });
  }

  private writeScore(): void {
    const cw = this.canvasWrapper;
    const color = this.scoreColor;
    const fontSize = this.scoreFontSize;

    const scoreText = `Your score: ${this.scoreTracker.score}`;

    cw.writeText(scoreText, this.verticalPadding, fontSize, color, fontSize);
  }

  private scoreAgainstPipes(): void {
    this.pipes.toArray().forEach((pipe) => {
      if (pipe.getX() + pipe.width >= this.block.x) {
        return;
      }
      if (pipe.isDefeated()) {
        return;
      }

      pipe.defeat();
      this.scoreTracker.increment();
    });
  }

  private prunePipes(): void {
    let leftMostPipe = this.pipes.peekLeft();
    while (leftMostPipe.getX() + leftMostPipe.width < 0) {
      this.pipes.popLeft();
      leftMostPipe = this.pipes.peekLeft();
    }
  }

  private checkCollisions(): void {
    const collides = this.collidesWithSky() || this.collidesWithGround() ||
      this.collidesWithPipes();
    if (collides) {
      this.changeScreen();
    }
  }

  private collidesWithSky(): boolean {
    return this.block.y < this.verticalPadding;
  }

  private collidesWithGround(): boolean {
    return this.block.y + this.block.height >
      this.canvasWrapper.height - this.verticalPadding;
  }

  private collidesWithPipes(): boolean {
    const blockXStart = this.block.x;
    const blockXEnd = blockXStart + this.block.width;

    const blockYStart = this.block.y;
    const blockYEnd = blockYStart + this.block.height;

    for (const pipe of this.pipes.toArray()) {
      const pipeXStart = pipe.getX();
      const pipeXEnd = pipeXStart + pipe.width;
      const topPipeYBottom = this.verticalPadding + pipe.topPipeHeight;
      const bottomPipeYTop = topPipeYBottom + pipe.spaceBetweenPipes;

      if (blockXEnd < pipeXStart || blockXStart > pipeXEnd) {
        continue;
      }
      if (blockYStart > topPipeYBottom && blockYEnd < bottomPipeYTop) {
        continue;
      }
      return true;
    }

    return false;
  }

  handleEnterPress(): void {
    // do nothing
  }
}
