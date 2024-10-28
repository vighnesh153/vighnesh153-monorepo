export class CellPosition {
  get row(): number {
    return this.#row;
  }
  get col(): number {
    return this.#col;
  }

  #row: number;
  #col: number;

  constructor(row: number, col: number) {
    this.#row = row;
    this.#col = col;
  }
}
