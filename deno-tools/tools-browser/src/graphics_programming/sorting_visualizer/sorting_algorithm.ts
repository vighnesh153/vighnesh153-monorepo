export abstract class SortingAlgorithm {
  protected array: number[] = [];
  protected modifiedIndices: number[] = [];

  get intermediateArrayState(): number[] {
    return [...this.array];
  }

  get intermediateModifiedIndicesState(): number[] {
    return [...this.modifiedIndices];
  }

  initializeArray(array: number[]): void {
    this.array = array;
  }

  abstract sort(): Generator<undefined, void, unknown>;
}
