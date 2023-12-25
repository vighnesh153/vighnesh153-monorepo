import { CanvasWrapper } from '@/canvas-wrapper';
import { GameGridCell } from './GameGridCell';
import { createNewGrid } from './createNewGrid';

interface GameGridOptions {
  readonly rows: number;
  readonly cols: number;
  readonly cellWidth: number;
  readonly cellHeight: number;
}

export class GameGrid {
  readonly #canvasWrapper: CanvasWrapper;

  readonly rows: number;
  readonly cols: number;
  readonly cellWidth: number;
  readonly cellHeight: number;

  readonly grid: readonly (readonly GameGridCell[])[];

  constructor(canvasWrapper: CanvasWrapper, options: GameGridOptions) {
    this.#canvasWrapper = canvasWrapper;
    this.rows = options.rows;
    this.cols = options.cols;
    this.cellWidth = options.cellWidth;
    this.cellHeight = options.cellHeight;

    this.grid = createNewGrid(
      this.rows,
      this.cols,
      (row, col) =>
        new GameGridCell(canvasWrapper, {
          rowIndex: row,
          colIndex: col,
          width: this.cellWidth,
          height: this.cellHeight,
        })
    );
  }

  getCell(row: number, col: number): GameGridCell {
    return this.grid[row][col];
  }

  draw() {
    for (const row of this.grid) {
      for (const cell of row) {
        cell.draw();
      }
    }
  }
}
