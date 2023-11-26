import { SortingAlgorithm } from './SortingAlgorithm';

export class BubbleSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    const { array } = this;
    const size = this.array.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - i; j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          this.modifiedIndices = [j, j + 1];
          yield;
        }
      }
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
