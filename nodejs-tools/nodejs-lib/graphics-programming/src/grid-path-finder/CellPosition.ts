export class CellPosition {
  get row() {
    return this.#row;
  }
  get col() {
    return this.#col;
  }

  #row: number;
  #col: number;

  constructor(row: number, col: number) {
    this.#row = row;
    this.#col = col;
  }
}
