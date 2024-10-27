import { not, Queue } from "@vighnesh153/tools";

import type { BfsCell } from "./cell.ts";
import { CellsGrid } from "./cells_grid.ts";
import { fillGridWithStartAndEnd, fillGridWithWalls } from "./factories.ts";
import { CellPosition } from "./cell_position.ts";

export class GridPathFinderGame {
  #grid: CellsGrid;
  #state: "running" | "stopped" = "stopped";
  #visitedCellIds: Set<string> = new Set();
  #currentCellPointer: BfsCell | null = null;
  #cellParents: Map<string, BfsCell> = new Map();
  #solutionPathCellIds: Set<string> = new Set();

  get isRunning() {
    return this.#state === "running";
  }

  static createNewWithDefaults(rows: number, cols: number): GridPathFinderGame {
    const cellsGrid = CellsGrid.createEmpty(rows, cols);
    fillGridWithWalls(cellsGrid);
    fillGridWithStartAndEnd(cellsGrid);
    return new GridPathFinderGame(cellsGrid);
  }

  constructor(grid: CellsGrid) {
    this.#grid = grid;
  }

  stop() {
    this.#state = "stopped";
  }

  isCellVisited(cell: BfsCell): boolean {
    return this.#visitedCellIds.has(cell.id);
  }

  isCellPartOfSolutionPath(cell: BfsCell): boolean {
    return this.#solutionPathCellIds.has(cell.id);
  }

  getCurrentPointerCellId(): string | null {
    return this.#currentCellPointer?.id ?? null;
  }

  getCell(row: number, col: number): BfsCell | null {
    return this.#grid.getCell(new CellPosition(row, col));
  }

  *solve() {
    this.#state = "running";

    const startCell = this.#grid.findCell((cell) => cell.isStart);
    if (!startCell) {
      return;
    }

    const frames = this.bfs(startCell);
    while (not(frames.next().done) && this.#state === "running") {
      yield;
    }
  }

  private *bfs(startCell: BfsCell) {
    const queue = new Queue<BfsCell>();
    queue.pushRight(startCell);

    let solutionExists = false;

    while (not(queue.isEmpty)) {
      const cell = queue.popLeft()!;
      const isVisited = this.#visitedCellIds.has(cell.id);

      if (cell.isWall || isVisited) {
        continue;
      }

      this.#currentCellPointer = cell;
      this.#visitedCellIds.add(cell.id);

      if (cell.isEnd) {
        solutionExists = true;
        break;
      }

      yield;

      const neighbourCells = this.#grid.getNeighbourCells(cell);
      neighbourCells.forEach((neighbour) =>
        this.updateParentIfOrphan(neighbour, cell)
      );
      queue.pushRight(...neighbourCells);
    }

    // By updateParentIfOrphan logic, even start cell will get assigned a parent
    // which is actually its child. So, cleanup the startCell's parent
    this.#cellParents.delete(startCell.id);

    // backtrack the path to start
    if (solutionExists) {
      let current = this.#currentCellPointer;
      this.#currentCellPointer = null;
      while (current !== null) {
        this.#solutionPathCellIds.add(current.id);
        current = this.#cellParents.get(current.id) ?? null;
        yield;
      }
    }
  }

  private updateParentIfOrphan(cell: BfsCell, potentialParent: BfsCell) {
    if (this.#cellParents.has(cell.id)) {
      return;
    }
    this.#cellParents.set(cell.id, potentialParent);
  }
}
