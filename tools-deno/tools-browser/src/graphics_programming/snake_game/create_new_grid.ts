import { repeat } from "@vighnesh153/tools";
import type { GameGridCell } from "./game_grid_cell.ts";

type CellInitializer = (row: number, col: number) => GameGridCell;

export function createNewGrid(
  rows: number,
  cols: number,
  initializer: CellInitializer,
): GameGridCell[][] {
  const grid = new Array(rows);
  repeat(rows, (rowCount) => {
    grid[rowCount - 1] = new Array(cols);
    repeat(cols, (colCount) => {
      grid[rowCount - 1][colCount - 1] = initializer(
        rowCount - 1,
        colCount - 1,
      );
    });
  });
  return grid;
}
