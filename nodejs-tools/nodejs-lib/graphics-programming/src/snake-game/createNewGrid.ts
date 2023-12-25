import { repeat } from '@vighnesh153/utils';
import { GameGridCell } from './GameGridCell';

type CellInitializer = (row: number, col: number) => GameGridCell;

export function createNewGrid(rows: number, cols: number, initializer: CellInitializer): GameGridCell[][] {
  const grid = new Array(rows);
  repeat(rows, (rowCount) => {
    grid[rowCount - 1] = new Array(cols);
    repeat(cols, (colCount) => {
      grid[rowCount - 1][colCount - 1] = initializer(rowCount - 1, colCount - 1);
    });
  });
  return grid;
}
