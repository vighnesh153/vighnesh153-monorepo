import { Queue, not } from '@vighnesh153/utils';

import { BfsCell } from './Cell';
import { CellsGrid } from './CellsGrid';

export class Game {
  #state: 'running' | 'stopped' = 'stopped';
  #visitedCellIds: Set<string> = new Set();
  #currentCellPointer: BfsCell | null = null;
  #cellParents: Map<string, BfsCell> = new Map();
  #solutionPathCellIds: Set<string> = new Set();

  constructor(private grid: CellsGrid) {
    this.grid = grid;
  }

  start() {
    this.#state = 'running';
  }

  stop() {
    this.#state = 'stopped';
  }

  solve() {
    const startCell = this.grid.findCell((cell) => cell.isStart);
    if (!startCell) {
      return;
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

      const neighbourCells = this.grid.getNeighbourCells(cell);
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
