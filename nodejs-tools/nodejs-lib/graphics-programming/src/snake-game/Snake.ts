import { Queue } from '@vighnesh153/utils';
import { PositionDelta } from './PositionDelta';
import { GameGrid } from './GameGrid';
import { GameGridCell } from './GameGridCell';
import { generateRandomPosition } from './generateRandomPosition';
import { FoodController } from './FoodController';
import { Direction } from './Direction';

const blockChange: Record<Direction, PositionDelta> = {
  right: { dx: 1, dy: 0 },
  bottom: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  top: { dx: 0, dy: -1 },
};

interface SnakeConfig {
  gameGrid: GameGrid;
  foodController: FoodController;
  blockRow?: number;
  blockCol?: number;
  initialDirection?: Direction;
}

export class Snake {
  static readonly INITIAL_SIZE = 3;

  readonly gameGrid: GameGrid;
  readonly foodController: FoodController;
  readonly body: Queue<GameGridCell> = new Queue();

  #size = Snake.INITIAL_SIZE;
  #headRow: number;
  #headCol: number;
  #direction: Direction;

  get size(): number {
    return this.#size;
  }

  constructor(config: SnakeConfig) {
    this.gameGrid = config.gameGrid;
    this.foodController = config.foodController;

    const randomInitialSnakePosition = generateRandomPosition(this.gameGrid.rows, this.gameGrid.cols);
    this.#headRow = config.blockRow ?? randomInitialSnakePosition.x;
    this.#headCol = config.blockCol ?? randomInitialSnakePosition.y;

    this.#direction = config.initialDirection ?? 'right';

    this.addNewSnakeBlock();
    this.updateHeadBlockNumber();
  }

  update(): void {
    this.addNewSnakeBlock();
    this.updateHeadBlockNumber();
    this.pruneBody();
  }

  setDirection(direction: Direction): void {
    this.#direction = direction;
  }

  private grow(): void {
    this.#size++;
  }

  private reset(): void {
    this.#size = Snake.INITIAL_SIZE;
  }

  private addNewSnakeBlock(): void {
    const cell = this.gameGrid.getCell(this.#headRow, this.#headCol);
    if (cell.is('food')) {
      this.foodController.consumeFood();
      this.grow();
    }
    if (cell.is('snake')) {
      this.reset();
    }
    cell.updateType('snake');
    this.body.pushRight(cell);
  }

  private updateHeadBlockNumber(): void {
    this.#headRow += blockChange[this.#direction].dx;
    this.#headCol += blockChange[this.#direction].dy;
    this.coerceBlockNumbers();
  }

  private pruneBody(): void {
    while (this.body.size > this.size) {
      const cell = this.body.popLeft();
      cell.updateType('empty');
    }
  }

  private coerceBlockNumbers(): void {
    this.#headRow += this.gameGrid.rows;
    this.#headRow %= this.gameGrid.rows;

    this.#headCol += this.gameGrid.cols;
    this.#headCol %= this.gameGrid.cols;
  }
}
