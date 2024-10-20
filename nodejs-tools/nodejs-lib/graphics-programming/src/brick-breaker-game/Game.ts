import { not } from "@vighnesh153/tools";
import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { getCanvasBgColor } from "@/getCanvasBgColor.ts";
import { Paddle } from "./Paddle.ts";
import { Ball } from "./Ball.ts";
import { ScoreTracker } from "./ScoreTracker.ts";
import { Brick } from "./Brick.ts";
import { createBricksGrid } from "./createBricksGrid.ts";

interface BrickBreakerGameOptions {
  readonly bgColor?: string;
  readonly scoreColor?: string;
  readonly scoreFontSize?: number;
  readonly rows?: number;
  readonly placeholderBrickRows?: number;
  readonly columns?: number;

  onGameOver(): void;
}

export class BrickBreakerGame {
  readonly canvasWrapper: CanvasWrapper;
  readonly bgColor: string;
  readonly scoreColor: string;
  readonly scoreFontSize: number;
  readonly rows: number;
  readonly placeholderBrickRows: number;
  readonly columns: number;
  private readonly onGameOver: () => void;

  private paddle!: Paddle;
  private ball!: Ball;

  private readonly scoreTracker = new ScoreTracker();
  private bricksGrid!: readonly (readonly Brick[])[];

  private isRunning = false;

  private previousBrickRow: number | null = null;
  private previousBrickCol: number | null = null;

  constructor(canvasWrapper: CanvasWrapper, options: BrickBreakerGameOptions) {
    this.canvasWrapper = canvasWrapper;

    this.bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.scoreColor = options.scoreColor ?? "black";
    this.scoreFontSize = options.scoreFontSize ?? 15;
    this.rows = options.rows ?? 15;
    this.placeholderBrickRows = options.placeholderBrickRows ?? 3;
    this.columns = options.columns ?? 20;
    this.onGameOver = options.onGameOver;

    this.reset();
  }

  private reset(): void {
    const { canvasWrapper } = this;

    // reset score
    this.scoreTracker.reset();

    // reset ball
    this.ball = new Ball(canvasWrapper, {
      coordinate: {
        x: canvasWrapper.width / 2,
        y: (canvasWrapper.height * 5) / 6,
      },
    });

    // reset paddle
    this.paddle = new Paddle(canvasWrapper, {
      y: (canvasWrapper.height * 6) / 7,
    });

    // create bricks grid
    this.bricksGrid = createBricksGrid(
      this.rows,
      this.columns,
      (row, column) =>
        new Brick(canvasWrapper, {
          row,
          column,
          width: canvasWrapper.width / 20,
          visible: row >= this.placeholderBrickRows &&
            row < this.rows - this.placeholderBrickRows,
        }),
    );
  }

  *start() {
    this.isRunning = true;
    while (this.isRunning) {
      this.draw();
      this.update();
      yield;
    }
  }

  stop() {
    this.isRunning = false;
  }

  private draw(): void {
    this.clear();
    this.paddle.draw();
    this.ball.draw();
    this.writeScore();
    this.drawBricks();
  }

  private update(): void {
    this.ball.update();
    this.handleCollisions();
    this.handleGameOver();
  }

  handleMouseMove(e: MouseEvent, scrollLeft: number) {
    const { rect } = this.canvasWrapper;
    const mouseX = e.clientX - rect.left - scrollLeft;

    // we subtract width/2 to align the mouse position with pad's center
    const paddleX = mouseX - this.paddle.width / 2;

    this.paddle.updateX(paddleX);
  }

  clear() {
    const rect = this.canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.canvasWrapper.drawFilledRect(
      0,
      0,
      canvasWidth,
      canvasHeight,
      this.bgColor,
    );
  }

  private writeScore(): void {
    const cw = this.canvasWrapper;
    const color = this.scoreColor;
    const fontSize = this.scoreFontSize;

    const scoreText = `Your score: ${this.scoreTracker.getScore()}`;

    cw.writeText(scoreText, 20, 20, color, fontSize);
  }

  private drawBricks(): void {
    for (const bricksRow of this.bricksGrid) {
      for (const brick of bricksRow) {
        brick.draw();
      }
    }
  }

  private handleGameOver(): void {
    const maxScore = this.rows * this.columns;
    if (this.scoreTracker.getScore() === maxScore) {
      this.onGameOver();
    }
  }

  private handleCollisions(): void {
    this.handleCollisionWithLeftWall();
    this.handleCollisionWithRightWall();
    this.handleCollisionWithTopWall();
    this.handleCollisionWithBottomWall();
    this.handleCollisionWithPaddle();
    this.handleBrickCollision();
  }

  private handleCollisionWithLeftWall(): void {
    if (this.ball.coordinate.x <= 0) {
      this.ball.flipVelocityX();
    }
  }

  private handleCollisionWithRightWall(): void {
    if (this.ball.coordinate.x + this.ball.size >= this.canvasWrapper.width) {
      this.ball.flipVelocityX();
    }
  }

  private handleCollisionWithTopWall(): void {
    if (this.ball.coordinate.y <= 0) {
      this.ball.flipVelocityY();
    }
  }

  private handleCollisionWithBottomWall(): void {
    if (this.ball.coordinate.y + this.ball.size < this.canvasWrapper.height) {
      return;
    }

    this.reset();
  }

  private handleCollisionWithPaddle(): void {
    const { ball, paddle } = this;

    const ballLeft = ball.coordinate.x;
    const ballRight = ballLeft + ball.size;
    const ballTop = ball.coordinate.y;
    const ballBottom = ballTop + ball.size;

    const paddleLeft = paddle.x;
    const paddleRight = paddleLeft + paddle.width;
    const paddleTop = paddle.y;
    const paddleBottom = paddleTop + paddle.height;

    if (ballRight < paddleLeft) return;
    if (ballLeft > paddleRight) return;
    if (ballBottom < paddleTop) return;
    if (ballTop > paddleBottom) return;

    // collided with paddle
    ball.flipVelocityY();
  }

  private handleBrickCollision(): void {
    const { previousBrickRow, previousBrickCol } = this;
    const [[randomBrick]] = this.bricksGrid;
    const currentBrickRow = Math.floor(
      this.ball.coordinate.y / randomBrick.height,
    );
    const currentBrickCol = Math.floor(
      this.ball.coordinate.x / randomBrick.width,
    );
    const currentBrick = this.bricksGrid[currentBrickRow]?.[currentBrickCol] ??
      null;

    if (
      previousBrickCol === null ||
      previousBrickRow === null ||
      currentBrick === null ||
      not(currentBrick.isVisible)
    ) {
      this.previousBrickRow = currentBrickRow;
      this.previousBrickCol = currentBrickCol;
      return;
    }

    if (
      currentBrickRow !== previousBrickRow &&
      currentBrickCol !== previousBrickCol
    ) {
      // ball is travelling diagonally
      this.ball.flipVelocityX();
      this.ball.flipVelocityY();
    } else if (currentBrickRow !== previousBrickRow) {
      // ball is travelling more vertically
      this.ball.flipVelocityY();
    } else if (currentBrickCol !== previousBrickCol) {
      // ball is travelling more horzontally
      this.ball.flipVelocityX();
    }

    currentBrick.destroy();
    this.scoreTracker.increment();
    this.previousBrickRow = currentBrickRow;
    this.previousBrickCol = currentBrickCol;
  }
}
