import { CellPosition } from "./CellPosition.ts";

export type CellType = "empty" | "start" | "end" | "wall";

export class BfsCell {
  #id: string = Math.random().toString(16).slice(2);
  #type: CellType = "empty";

  get id() {
    return this.#id;
  }
  get isEmpty() {
    return this.#type === "empty";
  }
  get isStart() {
    return this.#type === "start";
  }
  get isEnd() {
    return this.#type === "end";
  }
  get isWall() {
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
