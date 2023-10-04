import { Queue, not } from '@vighnesh153/utils';

import { BfsCell } from './Cell';
import { CellsGrid } from './CellsGrid';
import { fillGridWithStartAndEnd, fillGridWithWalls } from './factories';
import { CellPosition } from './CellPosition';

export class GridPathFinderGame {
  #grid: CellsGrid;
  #state: 'running' | 'stopped' = 'stopped';
  #visitedCellIds: Set<string> = new Set();
  #currentCellPointer: BfsCell | null = null;
  #cellParents: Map<string, BfsCell> = new Map();
  #solutionPathCellIds: Set<string> = new Set();

  get isRunning() {
    return this.#state === 'running';
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
    this.#state = 'stopped';
  }

  getVisitedCellIds(): Set<string> {
    return new Set(this.#visitedCellIds);
  }

  getSolutionPathCellIds(): Set<string> {
    return new Set(this.#solutionPathCellIds);
  }

  getCurrentPointerCellId(): string | null {
    return this.#currentCellPointer?.id ?? null;
  }

  getCell(row: number, col: number): BfsCell | null {
    return this.#grid.getCell(new CellPosition(row, col));
  }

  *solve() {
    this.#state = 'running';

    const startCell = this.#grid.findCell((cell) => cell.isStart);
    if (!startCell) {
      return;
    }

    const frames = this.bfs(startCell);
    while (not(frames.next().done) && this.#state === 'running') {
      yield;
    }
  }

  private *bfs(startCell: BfsCell) {
    const queue = new Queue<BfsCell>();
    queue.pushRight(startCell);

    let solutionExists = false;

    while (not(queue.isEmpty)) {
      const cell = queue.popLeft()!;

      this.#currentCellPointer = cell;
      const isVisited = this.#visitedCellIds.has(cell.id);
      this.#visitedCellIds.add(cell.id);

      if (isVisited || cell.isWall) {
        continue;
      }

      if (cell.isEnd) {
        solutionExists = true;
        break;
      }

      yield;

      const neighbourCells = this.#grid.getNeighbourCells(cell);
      neighbourCells.forEach((neighbour) => this.updateParentIfOrphan(neighbour, cell));
      queue.pushRight(...neighbourCells);
    }

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
