import { assertEquals, assertFalse, assertThrows } from "@std/assert";
import { Heap } from "./heap.ts";

Deno.test("heap.size should return the correct size of the heap", () => {
  const heap = new Heap("1234567");
  assertEquals(heap.size, 7);
});

Deno.test("heap.isEmpty should return true for isEmpty if heap has no elements", () => {
  const heap = new Heap([]);
  assertEquals(heap.isEmpty, true);
});

Deno.test("heap.isEmpty should return false for isEmpty if heap has some elements", () => {
  const heap = new Heap("1, 2, 3");
  assertFalse(heap.isEmpty);
});

Deno.test("heap.pop should throw if pop is invoked on an empty heap", () => {
  const heap = new Heap([]);
  assertThrows(() => heap.pop(), "Heap is empty");
});

Deno.test("heap.pop should pop the smallest element from the heap", () => {
  const heap = new Heap([5, 3, 2, 6, 4]);
  const poppedElement = heap.pop();

  assertEquals(poppedElement, 2);
});

Deno.test("heap.toSortedArray should allow to convert the heap of numbers to a sorted array", () => {
  const array = [5, 6, 1, 9, 8, 8, 4, 2, 7, 0];
  const heap = new Heap(array);
  const sortedNumbers = heap.toSortedArray();

  assertEquals(sortedNumbers, array.sort((a, b) => a - b));
});

Deno.test("heap.toSortedArray should allow to convert the heap of string to a sorted array of characters", () => {
  const heap = new Heap("qwerty");
  const sortedCharacters = heap.toSortedArray();

  assertEquals(sortedCharacters, ["e", "q", "r", "t", "w", "y"]);
});

Deno.test("heap.push should allow to push an element to the heap", () => {
  const heap = new Heap([4, 3, 5, 7, 1]);
  heap.push(6);

  assertEquals(heap.toSortedArray(), [1, 3, 4, 5, 6, 7]);
});

Deno.test("heap.peek should allow to peek at top element", () => {
  const heap = new Heap([4, 3, 5, 7, 1]);

  assertEquals(heap.peek(), 1);
});

Deno.test("heap.toSortedArray should not modify the heap when peeking", () => {
  const heap = new Heap([4, 3, 5, 7, 1]);

  // should not modify array
  heap.peek();

  assertEquals(heap.toSortedArray(), [1, 3, 4, 5, 7]);
});

Deno.test("heap.toSortedArray should use the custom comparatorFn if passed", () => {
  const array = [1, 4, 2, 3];
  const sortedArray = array.sort((a, b) => b - a);

  // Max-heap simulation
  const heap = new Heap(array, (el1, el2) => (el1 > el2 ? -1 : 1));
  const sortedHeapArray = heap.toSortedArray();

  // It should be sorted in descending order
  assertEquals(sortedHeapArray, sortedArray);
});
