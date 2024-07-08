import { BinarySearchComparator, defaultBinarySearchComparator } from '../binarySearch';

/**
 * Search for an item in an ascending sorted array (with duplicates) and return its right-most index.
 * If element doesn't exist, returns null.
 *
 * @param items - list of elements in which you want to search
 * @param targetElement - Search element
 * @param comparator - Compares two entries. Returns `0` if entries are same, `-1` if `entry1` is less
 * than `entry2`, else, `1`
 *
 * @typeParam T - type of elements in the array
 */
export function binarySearchRightmost<T>(
  items: T[],
  targetElement: T,
  comparator: BinarySearchComparator<T> = defaultBinarySearchComparator
): number | null {
  let startIndex = 0;
  let endIndex = items.length - 1;
  let resultIndex: number | null = null;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midElement = items[midIndex];

    const compareResult = comparator(midElement, targetElement);

    // Element found
    if (compareResult === 0) {
      resultIndex = Math.max(resultIndex ?? -Infinity, midIndex);
      startIndex = midIndex + 1;
    }

    // element is in second half
    if (compareResult === -1) {
      startIndex = midIndex + 1;
    }

    // element is in first half
    if (compareResult === 1) {
      endIndex = midIndex - 1;
    }
  }

  return resultIndex;
}
