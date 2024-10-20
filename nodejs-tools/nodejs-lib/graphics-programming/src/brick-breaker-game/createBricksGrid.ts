import { repeat } from '@vighnesh153/tools';
import { Brick } from './Brick.ts';

type BrickCreator = (row: number, column: number) => Brick;

export function createBricksGrid(rows: number, columns: number, brickCreator: BrickCreator): Brick[][] {
  const grid = new Array(rows);
  repeat(rows, (rowCount) => {
    const row = rowCount - 1;
    grid[row] = new Array(columns);
    repeat(columns, (colCount) => {
      const col = colCount - 1;
      grid[row][col] = brickCreator(row, col);
    });
  });
  return grid;
}
