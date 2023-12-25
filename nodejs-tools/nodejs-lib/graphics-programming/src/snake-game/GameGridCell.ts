import { CanvasWrapper } from '@/canvas-wrapper';

type CellType = 'empty' | 'snake' | 'food';

interface GameGridCellConfig {
  rowIndex: number;
  colIndex: number;
  width: number;
  height: number;
  initialType?: CellType;
  endPadding?: number;

  colors?: Partial<Record<CellType, string>>;
}

export class GameGridCell {
  readonly #canvasWrapper: CanvasWrapper;

  readonly width: number;
  readonly height: number;
  readonly rowIndex: number;
  readonly colIndex: number;
  readonly endPadding: number;

  readonly colors: Record<CellType, string>;

  #cellType: CellType;

  constructor(canvasWrapper: CanvasWrapper, config: GameGridCellConfig) {
    this.#canvasWrapper = canvasWrapper;

    this.width = config.width;
    this.height = config.height;
    this.rowIndex = config.rowIndex;
    this.rowIndex = config.rowIndex;
    this.colIndex = config.colIndex;

    this.colors = {
      snake: config.colors?.snake ?? 'blue',
      food: config.colors?.snake ?? 'red',
      empty: config.colors?.snake ?? 'white',
    };

    this.#cellType = config.initialType ?? 'empty';
    this.endPadding = config.endPadding ?? 1;
  }

  draw() {
    if (this.is('empty')) {
      return;
    }
    const cw = this.#canvasWrapper;
    const w = this.width;
    const h = this.height;
    const { rowIndex, colIndex, endPadding } = this;
    const color = this.colors[this.#cellType];
    cw.drawFilledRect(rowIndex * w, colIndex * h, w - endPadding, h - endPadding, color);
  }

  is(type: CellType): boolean {
    return this.#cellType === type;
  }

  updateType(type: CellType): void {
    this.#cellType = type;
  }
}
