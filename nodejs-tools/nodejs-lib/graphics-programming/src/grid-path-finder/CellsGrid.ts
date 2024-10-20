import { BfsCell } from './Cell.ts';
import { CellPosition } from './CellPosition.ts';

function createCellsBoard(rows: number, cols: number): BfsCell[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }));
}

export class CellsGrid {
  #board: BfsCell[][];
  #rows: number;
  #cols: number;

  static createEmpty(rows: number, cols: number): CellsGrid {
    const board = createCellsBoard(rows, cols);
    const grid: CellsGrid = new CellsGrid(board, rows, cols);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const position = new CellPosition(row, col);
        grid.updateCell(position, new BfsCell(position));
      }
    }

    return grid;
  }

  private constructor(board: BfsCell[][], rows: number, cols: number) {
    this.#board = board;
    this.#rows = rows;
    this.#cols = cols;
  }

  getCell(cellPosition: CellPosition): BfsCell | null {
    if (
      cellPosition.row < 0 ||
      cellPosition.row >= this.#rows ||
      cellPosition.col < 0 ||
      cellPosition.col >= this.#cols
    ) {
      return null;
    }
    return this.#board[cellPosition.row][cellPosition.col];
  }

  updateCell(cellPosition: CellPosition, newCell: BfsCell) {
    this.#board[cellPosition.row][cellPosition.col] = newCell;
  }

  mapEachCell<T>(action: (cell: BfsCell) => T): T[] {
    const result: T[] = Array.from({ length: this.#rows * this.#cols });
    for (let row = 0; row < this.#rows; row++) {
      for (let col = 0; col < this.#cols; col++) {
        result[row * this.#cols + col] = action(this.#board[row][col]);
      }
    }
    return result;
  }

  forEachCell(action: (cell: BfsCell) => void) {
    this.mapEachCell(action);
  }

  findCell(predicate: (cell: BfsCell) => boolean): BfsCell | null {
    return this.mapEachCell((cell) => (predicate(cell) ? cell : null)).find((cell) => cell !== null) ?? null;
  }

  getNeighbourCells(cell: BfsCell): Array<BfsCell> {
    const neighbours: Array<BfsCell> = [];
    cell.neighbourPositions().forEach((position) => {
      const neighbour = this.getCell(position);
      if (neighbour !== null) {
        neighbours.push(neighbour);
      }
    });
    return neighbours;
  }
}
