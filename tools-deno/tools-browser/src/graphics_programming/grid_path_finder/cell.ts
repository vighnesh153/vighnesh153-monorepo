import { CellPosition } from "./cell_position.ts";

export type CellType = "empty" | "start" | "end" | "wall";

export class BfsCell {
  #id: string = Math.random().toString(16).slice(2);
  #type: CellType = "empty";

  get id(): string {
    return this.#id;
  }
  get isEmpty(): boolean {
    return this.#type === "empty";
  }
  get isStart(): boolean {
    return this.#type === "start";
  }
  get isEnd(): boolean {
    return this.#type === "end";
  }
  get isWall(): boolean {
    return this.#type === "wall";
  }
  set type(cellType: CellType) {
    this.#type = cellType;
  }

  constructor(public cellPosition: CellPosition) {}

  neighbourPositions(): CellPosition[] {
    return [
      new CellPosition(this.cellPosition.row + 1, this.cellPosition.col),
      new CellPosition(this.cellPosition.row - 1, this.cellPosition.col),
      new CellPosition(this.cellPosition.row, this.cellPosition.col + 1),
      new CellPosition(this.cellPosition.row, this.cellPosition.col - 1),
    ];
  }
}
