import { SortingAlgorithm } from './SortingAlgorithm';

export class BubbleSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    const { array } = this;
    const size = array.length;

    for (let i = 0; i < size; i++) {
      // (size - 1) because we access the j + 1 index
      // -i is just an optimization because the last i elements are already at correct positions
      for (let j = 0; j < size - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          this.swap(j, j + 1);
          this.updateModifiedIndices(j, j + 1);
          yield;
        }
      }
    }
    this.updateModifiedIndices(-1, -1);
    yield;
  }

  private swap(i: number, j: number): void {
    const { array } = this;
    const size = array.length;

    if (i >= size || j >= size) {
      throw new Error(`Index out of bounds: i=${i}, j=${j}, size=${size}`);
    }

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  private updateModifiedIndices(i: number, j: number): void {
    if (this.modifiedIndices.length < 2) {
      this.modifiedIndices = [i, j];
    } else {
      this.modifiedIndices[0] = i;
      this.modifiedIndices[1] = j;
    }
  }
}

export class MergeSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    yield;
  }
}

export class SelectionSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    yield;
  }
}

export class InsertionSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    yield;
  }
}
