/* eslint-disable @typescript-eslint/no-unused-vars */
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
  private originalArray: number[] = [];

  *sort() {
    const { array } = this;
    this.originalArray = [...array];
    console.log('Starting');
    const sortedArray = this.mergeSort(array, 0, array.length - 1);
    this.array = sortedArray;
    console.log('Ending');
    yield;
  }

  private mergeSort(array: number[], startIndex: number, endIndex: number): number[] {
    if (startIndex === endIndex) return [array[startIndex]];

    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const left = this.mergeSort(array, startIndex, midIndex);
    const right = this.mergeSort(array, midIndex + 1, endIndex);

    return this.merge(left, right);
  }

  private merge(array1: number[], array2: number[]): number[] {
    let index1 = 0;
    let index2 = 0;

    const size1 = array1.length;
    const size2 = array2.length;

    let index = 0;
    const mergedArray: number[] = Array.from({ length: size1 + size2 });
    function addToMergedArray(entry: number): void {
      mergedArray[index++] = entry;
    }

    while (index1 < size1 && index2 < size2) {
      const element1 = array1[index1];
      const element2 = array2[index2];

      if (element1 < element2) {
        addToMergedArray(element1);
        index1++;
      } else {
        addToMergedArray(element2);
        index2++;
      }
    }

    while (index1 < size1) {
      addToMergedArray(array1[index1++]);
    }

    while (index2 < size2) {
      addToMergedArray(array2[index2++]);
    }

    return mergedArray;
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
