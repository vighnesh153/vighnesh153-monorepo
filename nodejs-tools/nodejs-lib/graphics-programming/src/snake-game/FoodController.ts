import { GameGrid } from './GameGrid';
import { shuffle } from '@vighnesh153/tools-platform-independent';
import { GameGridCell } from './GameGridCell';

interface FoodControllerConfig {
  readonly gameGrid: GameGrid;
}

export class FoodController {
  readonly gameGrid: GameGrid;
  #food: GameGridCell;

  constructor(config: FoodControllerConfig) {
    this.gameGrid = config.gameGrid;
    this.#food = this.newFood();
  }

  consumeFood() {
    this.#food.updateType('empty');
    this.#food = this.newFood();
  }

  private newFood(): GameGridCell {
    const cells = this.gameGrid.grid.flatMap((row) => row);
    const emptyCells = cells.filter((cell) => cell.is('empty'));

    if (emptyCells.length === 0) {
      alert('Game over....');
    }

    const [food] = shuffle(emptyCells);
    food.updateType('food');
    return food;
  }
}
