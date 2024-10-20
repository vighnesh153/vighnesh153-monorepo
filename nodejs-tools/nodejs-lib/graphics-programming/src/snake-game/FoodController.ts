import { shuffleIterable } from '@vighnesh153/tools';
import { GameGrid } from './GameGrid.ts';
import { GameGridCell } from './GameGridCell.ts';

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

    const [food] = shuffleIterable(emptyCells);
    food.updateType('food');
    return food;
  }
}
