import { not } from "@vighnesh153/tools";

import type { CellPosition } from "./cell_position.ts";
import type { CellsGrid } from "./cells_grid.ts";
import type { BfsCell } from "./cell.ts";

function getRandomEmptyCell(grid: CellsGrid): BfsCell | null {
  const emptyCells = grid.mapEachCell((cell) => cell).filter((cell) =>
    cell.isEmpty
  );
  if (emptyCells.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

export function fillGridWithWalls(
  grid: CellsGrid,
  walls?: Array<CellPosition>,
): void {
  if (walls) {
    walls.forEach((position) => {
      const cell = grid.getCell(position);
      if (cell !== null) {
        cell.type = "wall";
      }
    });
    return;
  }

  // random walls
  grid.forEachCell((cell) => {
    if (Math.random() < 0.3) {
      cell.type = "wall";
    }
  });
}

export function fillGridWithStartAndEnd(
  grid: CellsGrid,
  start?: CellPosition,
  end?: CellPosition,
): void {
  let startDone = false;
  let endDone = false;

  if (start) {
    const cell = grid.getCell(start);
    if (cell !== null) {
      cell.type = "start";
    }
    startDone = true;
  }

  if (end) {
    const cell = grid.getCell(end);
    if (cell !== null) {
      cell.type = "end";
    }
    endDone = true;
  }

  if (not(startDone)) {
    const randomCell = getRandomEmptyCell(grid);
    if (randomCell !== null) {
      randomCell.type = "start";
    }
  }

  if (not(endDone)) {
    const randomCell = getRandomEmptyCell(grid);
    if (randomCell !== null) {
      randomCell.type = "end";
    }
  }
}
