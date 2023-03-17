import { not } from '../not';

/**
 * Comparison result between 2 elements. Returned result's meaning: <br>
 * -1: first element is greater <br>
 * 0: both elements are same <br>
 * 1: second element is greater <br>
 */
export type ArrayComparison = -1 | 0 | 1;

function defaultCompareFn<T>(el1: T, el2: T): ArrayComparison {
  if (el1 < el2) return -1;
  if (el1 > el2) return 1;
  return 0;
}

[].sort();

/**
 * Checks if both arrays are same
 *
 * @param array1 - first array
 * @param array2 - second array
 * @param compareFn - Specifies a function that defines the sort order. If omitted, the
 * array elements are compared based on the `===` result
 */
export function areArraysEqual<T>(array1: Array<T>, array2: Array<T>, compareFn = defaultCompareFn<T>): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    const el1 = array1[i];
    const el2 = array2[i];

    // at least 1 element is not same in both arrays. Hence, return false
    if (compareFn(el1, el2) !== 0) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the first array is less than the second one
 *
 * @param array1 - first array
 * @param array2 - second array
 * @param compareFn - Specifies a function that defines the sort order. If omitted, the
 * array elements are compared based on the `===` result
 */
export function isArrayLessThan<T>(array1: Array<T>, array2: Array<T>, compareFn = defaultCompareFn<T>): boolean {
  const length1 = array1.length;
  const length2 = array2.length;

  let i1 = 0;
  let i2 = 0;

  while (i1 < length1 && i2 < length2) {
    const el1 = array1[i1];
    const el2 = array2[i2];

    const compareResult = compareFn(el1, el2);

    if (compareResult === -1) return true;
    if (compareResult === 1) return false;

    i1++;
    i2++;
  }

  // If we exit out of loop, then at least 1 index went out of bounds.
  // If "i1" goes out of bounds and "i2" is within bounds, then, array1 is less than array 2
  // If both go out of bounds, arrays are equal
  // If only "i2" goes out of bounds, then array1 is greater
  return i1 === length1 && i2 < length2;
}

/**
 * Checks if the first array is less than or equal to the second one
 *
 * @param array1 - first array
 * @param array2 - second array
 * @param compareFn - Specifies a function that defines the sort order. If omitted, the
 * array elements are compared based on the `===` result
 */
export function isArrayLessThanOrEqualTo<T>(
  array1: Array<T>,
  array2: Array<T>,
  compareFn = defaultCompareFn<T>
): boolean {
  return isArrayLessThan(array1, array2, compareFn) || areArraysEqual(array1, array2, compareFn);
}

/**
 * Checks if the first array is greater than the second one
 *
 * @param array1 - first array
 * @param array2 - second array
 * @param compareFn - Specifies a function that defines the sort order. If omitted, the
 * array elements are compared based on the `===` result
 */
export function isArrayGreaterThan<T>(array1: Array<T>, array2: Array<T>, compareFn = defaultCompareFn<T>): boolean {
  return not(isArrayLessThanOrEqualTo(array1, array2, compareFn));
}

/**
 * Checks if the first array is greater than or equal to the second one
 *
 * @param array1 - first array
 * @param array2 - second array
 * @param compareFn - Specifies a function that defines the sort order. If omitted, the
 * array elements are compared based on the `===` result
 */
export function isArrayGreaterThanOrEqualTo<T>(
  array1: Array<T>,
  array2: Array<T>,
  compareFn = defaultCompareFn<T>
): boolean {
  return not(isArrayLessThan(array1, array2, compareFn));
}
