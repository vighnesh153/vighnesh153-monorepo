import { describe, expect, it } from 'vitest';
import { Heap } from './heap';

describe('Data Structures > Heap tests', () => {
  it('should return the correct size of the heap', () => {
    const heap = new Heap('1234567');
    expect(heap.size).toBe(7);
  });

  it('should return true for isEmpty if heap has no elements', () => {
    const heap = new Heap([]);
    expect(heap.isEmpty).toBe(true);
  });

  it('should return false for isEmpty if heap has some elements', () => {
    const heap = new Heap('1, 2, 3');
    expect(heap.isEmpty).toBe(false);
  });

  it('should throw if pop is invoked on an empty heap', () => {
    const heap = new Heap([]);
    expect(() => {
      heap.pop();
    }).toThrowErrorMatchingInlineSnapshot(`"Heap is empty"`);
  });

  it('should pop the smallest element from the heap', () => {
    const heap = new Heap([5, 3, 2, 6, 4]);
    const poppedElement = heap.pop();

    expect(poppedElement).toBe(2);
  });

  it('should allow to convert the heap of numbers to a sorted array', () => {
    const array = [5, 6, 1, 9, 8, 8, 4, 2, 7, 0];
    const heap = new Heap(array);
    const sortedNumbers = heap.toSortedArray();

    expect(sortedNumbers).toStrictEqual(array.sort((a, b) => a - b));
  });

  it('should allow to convert the heap of string to a sorted array of characters', () => {
    const heap = new Heap('qwerty');
    const sortedCharacters = heap.toSortedArray();

    expect(sortedCharacters).toStrictEqual(['e', 'q', 'r', 't', 'w', 'y']);
  });

  it('should allow to push an element to the heap', () => {
    const heap = new Heap([4, 3, 5, 7, 1]);
    heap.push(6);

    expect(heap.toSortedArray()).toStrictEqual([1, 3, 4, 5, 6, 7]);
  });

  it('should allow to peek at top element', () => {
    const heap = new Heap([4, 3, 5, 7, 1]);

    expect(heap.peek()).toStrictEqual(1);
  });

  it('should not modify the heap when peeking', () => {
    const heap = new Heap([4, 3, 5, 7, 1]);

    heap.peek();
    expect(heap.toSortedArray()).toStrictEqual([1, 3, 4, 5, 7]);
  });

  it('should use the custom comparatorFn', () => {
    const array = [1, 4, 2, 3];
    const sortedArray = array.sort((a, b) => b - a);

    // Max-heap simulation
    const heap = new Heap(array, (el1, el2) => (el1 > el2 ? -1 : 1));
    const sortedHeapArray = heap.toSortedArray();

    // It should be sorted in descending order
    expect(sortedHeapArray).toStrictEqual(sortedArray);
  });
});
