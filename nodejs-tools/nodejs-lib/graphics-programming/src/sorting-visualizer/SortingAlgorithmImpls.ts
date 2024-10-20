/* eslint-disable @typescript-eslint/no-unused-vars */
import { SortingAlgorithm } from './SortingAlgorithm.ts';

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
    yield* this.mergeSort(0, this.array.length - 1);
  }

  private *mergeSort(startIndex: number, endIndex: number): Iterable<undefined> {
    if (startIndex === endIndex) {
      return;
    }

    const midIndex = Math.floor((startIndex + endIndex) / 2);
    // left
    yield* this.mergeSort(startIndex, midIndex);
    // right
    yield* this.mergeSort(midIndex + 1, endIndex);

    const leftSortedArray = this.array.slice(startIndex, midIndex + 1);
    const rightSortedArray = this.array.slice(midIndex + 1, endIndex + 1);
    yield* this.merge(leftSortedArray, rightSortedArray, startIndex);
  }

  private *merge(array1: number[], array2: number[], startIndex: number): Iterable<undefined> {
    let resultIndex = startIndex;
    const { array } = this;
    let index1 = 0;
    let index2 = 0;

    function addToMergedArray(entry: number): void {
      array[resultIndex++] = entry;
    }

    while (index1 < array1.length && index2 < array2.length) {
      const element1 = array1[index1];
      const element2 = array2[index2];

      if (element1 < element2) {
        addToMergedArray(element1);
        index1++;
      } else {
        addToMergedArray(element2);
        index2++;
      }

      // for animation
      this.overwriteArray(resultIndex, array1.slice(index1), array2.slice(index2));
      this.modifiedIndices = [startIndex + index1, startIndex + array1.length + index2];
      yield;
    }

    while (index1 < array1.length) {
      addToMergedArray(array1[index1++]);

      // for animation
      this.overwriteArray(resultIndex, array1.slice(index1));
      this.modifiedIndices = [startIndex + index1];
      yield;
    }

    while (index2 < array2.length) {
      addToMergedArray(array2[index2++]);

      // for animation
      this.overwriteArray(resultIndex, array2.slice(index2));
      this.modifiedIndices = [startIndex + array1.length + index2];
      yield;
    }

    this.modifiedIndices = [];
    yield;
  }

  private overwriteArray(startIndex: number, ...arrays: number[][]) {
    for (const array of arrays) {
      for (const item of array) {
        this.array[startIndex++] = item;
      }
    }
  }
}

export class SelectionSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    const { array } = this;
    const n = array.length;

    for (let i = 0; i < n; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }

        // for animation
        this.modifiedIndices = [minIndex, j];
        yield;
      }

      this.swap(i, minIndex);

      // for animation
      this.modifiedIndices = [minIndex, i];
      yield;
    }

    this.modifiedIndices = [];
    yield;
  }

  private swap(index1: number, index2: number): void {
    const temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
  }
}

export class InsertionSortSortingAlgorithm extends SortingAlgorithm {
  *sort() {
    const { array } = this;
    const n = array.length;

    for (let i = 0; i < n; i++) {
      let j = i;
      while (j > 0 && array[j - 1] > array[j]) {
        this.swap(j, j - 1);

        // for animation
        this.modifiedIndices = [j, j - 1];
        yield;

        j--;
      }
      yield;
    }

    this.modifiedIndices = [];
    yield;
  }

  private swap(index1: number, index2: number): void {
    const temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
  }
}
