import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { getCanvasBgColor } from "@/getCanvasBgColor.ts";
import { FoodController } from "./FoodController.ts";
import { Snake } from "./Snake.ts";
import { GameGrid } from "./GameGrid.ts";
import { Direction } from "./Direction.ts";

interface GameOptions {
  readonly cols?: number;
  readonly rows?: number;
  readonly bgColor?: string;
  readonly textColor?: string;
  readonly fontSize?: number;
}

export class SnakeGame {
  readonly canvasWrapper: CanvasWrapper;

  readonly bgColor: string;
  readonly textColor: string;
  readonly rows: number;
  readonly cols: number;
  readonly fontSize: number;

  readonly foodController: FoodController;
  readonly snake: Snake;

  #isRunning = false;

  readonly gameGrid: GameGrid;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.canvasWrapper = canvasWrapper;
    this.bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.textColor = options.textColor ?? "black";
    this.fontSize = options.fontSize ?? 15;

    this.rows = options.rows ?? 90;
    this.cols = options.cols ?? 50;
    const cellWidth = this.canvasWrapper.width / this.rows;
    const cellHeight = this.canvasWrapper.height / this.cols;

    this.gameGrid = new GameGrid(canvasWrapper, {
      rows: this.rows,
      cols: this.cols,
      cellWidth,
      cellHeight,
    });

    this.foodController = new FoodController({ gameGrid: this.gameGrid });
    this.snake = new Snake({
      gameGrid: this.gameGrid,
      foodController: this.foodController,
    });
  }

  *start() {
    let updateThrottle = 0;
    this.#isRunning = true;
    while (this.#isRunning) {
      updateThrottle++;
      this.draw();
      if (updateThrottle % 7 === 0) {
        this.update();
      }
      yield;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  draw() {
    this.clear();
    this.gameGrid.draw();
    this.drawText();
  }

  update() {
    this.snake.update();
  }

  changeDirection(newDirection: Direction) {
    this.snake.setDirection(newDirection);
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

  private drawText(): void {
    const text = `Player score: ${this.snake.size - Snake.INITIAL_SIZE}`;
    this.canvasWrapper.writeText(text, 20, 20, this.textColor, this.fontSize);
  }
}
