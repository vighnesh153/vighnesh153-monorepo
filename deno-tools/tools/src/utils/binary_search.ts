export interface BinarySearchComparator<T> {
  (entry1: T, entry2: T): -1 | 0 | 1;
}

export function defaultBinarySearchComparator<T>(entry1: T, entry2: T) {
  if (entry1 < entry2) return -1;
  if (entry1 === entry2) return 0;
  return 1;
}

/**
 * Search for an item in an ascending sorted array and return its index.
 * If element doesn't exist, returns null.
 *
 * @param items - list of elements in which you want to search
 * @param targetElement - Search element
 * @param comparator - Compares two entries. Returns `0` if entries are same, `-1` if `entry1` is less
 * than `entry2`, else, `1`
 *
 * @typeParam T - type of elements in the array
 */
export function binarySearch<T>(
  items: T[],
  targetElement: T,
  comparator: BinarySearchComparator<T> = defaultBinarySearchComparator,
): number | null {
  let startIndex = 0;
  let endIndex = items.length - 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midElement = items[midIndex];

    const compareResult = comparator(midElement, targetElement);

    // Element found
    if (compareResult === 0) return midIndex;

    // element is in second half
    if (compareResult === -1) {
      startIndex = midIndex + 1;
    }

    // element is in first half
    if (compareResult === 1) {
      endIndex = midIndex - 1;
    }
  }

  return null;
}
