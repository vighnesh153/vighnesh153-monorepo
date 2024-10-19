import { assertEquals, assertNotStrictEquals, assertThrows } from "@std/assert";

import { Queue } from "./queue.ts";
import { isOdd } from "./is_odd.ts";

Deno.test("queue.toArray test", () => {
  const queue = new Queue(1, 2, 3, 4, 5);

  assertEquals(queue.toArray(), [1, 2, 3, 4, 5]);
});

Deno.test("queue.size should return 0 for size if the queue has no entries", () => {
  const queue = new Queue();

  assertEquals(queue.size, 0);
});

Deno.test("queue.size should return correct size of the queue if queue has entries", () => {
  const queue = new Queue(1, 2, 3, 4, 5, 6);

  assertEquals(queue.size, 6);
});

Deno.test("queue.isEmpty should return true for isEmpty if queue has no entries", () => {
  const queue = new Queue();

  assertEquals(queue.isEmpty, true);
});

Deno.test("queue.isEmpty should return false for isEmpty if queue has entries", () => {
  const queue = new Queue(1, 2, 3, 4);

  assertEquals(queue.isEmpty, false);
});

Deno.test("queue.pushRight should allow to push multiple entries to the queue from right", () => {
  const queue = new Queue();
  queue.pushRight(1, 2, 3);

  assertEquals(queue.toArray(), [1, 2, 3]);
});

Deno.test("queue.pushLeft should allow to push multiple entries to the queue from left", () => {
  const queue = new Queue();
  queue.pushLeft(1, 2, 3, 4);

  assertEquals(queue.toArray(), [4, 3, 2, 1]);
});

Deno.test("queue.peekLeft should allow to peek an element from the left", () => {
  const queue = new Queue(1, 2, 3);
  assertEquals(queue.peekLeft(), 1);
});

Deno.test("queue.peekLeft should not modify the queue elements if peeked from left", () => {
  const queue = new Queue(1, 2, 3);
  queue.peekLeft();
  assertEquals(queue.toArray(), [1, 2, 3]);
});

Deno.test("queue.peekLeft should throw if peekLeft is invoked on an empty Queue", () => {
  const queue = new Queue();
  assertThrows(() => queue.peekLeft(), "Queue is empty");
});

Deno.test("queue.peekRight should allow to peek an element from the right", () => {
  const queue = new Queue(1, 2, 3);
  assertEquals(queue.peekRight(), 3);
});

Deno.test("queue.peekRight should not modify the queue elements if peeked from right", () => {
  const queue = new Queue(1, 2, 3);
  queue.peekRight();
  assertEquals(queue.toArray(), [1, 2, 3]);
});

Deno.test("queue.peekRight should throw if peekRight is invoked on an empty Queue", () => {
  const queue = new Queue();
  assertThrows(() => queue.peekRight(), "Queue is empty");
});

Deno.test("queue.popLeft should return the popped element from the left", () => {
  const queue = new Queue(1, 2, 3);
  assertEquals(queue.popLeft(), 1);
});

Deno.test("queue.popLeft should remove the popped element from the left", () => {
  const queue = new Queue(1, 2, 3);
  queue.popLeft();
  assertEquals(queue.toArray(), [2, 3]);
});

Deno.test("queue.popLeft should set the size of the queue to 0, if popLeft is invoked on a queue with 1 entry", () => {
  const queue = new Queue(1);
  queue.popLeft();
  assertEquals(queue.size, 0);
});

Deno.test("queue.popLeft should throw if popLeft is invoked on an empty queue", () => {
  const queue = new Queue();
  assertThrows(() => queue.popLeft(), "Queue is empty");
});

Deno.test("queue.popRight should return the popped element from the right", () => {
  const queue = new Queue(1, 2, 3);
  assertEquals(queue.popRight(), 3);
});

Deno.test("queue.popRight should remove the popped element from the right", () => {
  const queue = new Queue(1, 2, 3);
  queue.popRight();
  assertEquals(queue.toArray(), [1, 2]);
});

Deno.test("queue.popRight should set the size of the queue to 0, if popRight is invoked on a queue with 1 entry", () => {
  const queue = new Queue(1);
  queue.popRight();
  assertEquals(queue.size, 0);
});

Deno.test("queue.popRight should throw if popRight is invoked on an empty queue", () => {
  const queue = new Queue();
  assertThrows(() => queue.popRight(), "Queue is empty");
});

Deno.test("queue.reverse should reverse a queue", () => {
  const queue = new Queue(1, 2, 3);
  const reversedQueue = queue.reverse();

  assertEquals(reversedQueue.toArray(), [3, 2, 1]);
});

Deno.test("queue.reverse should not modify the existing queue when reverse is invoked", () => {
  const queue = new Queue(1, 2, 3);
  queue.reverse();

  assertEquals(queue.toArray(), [1, 2, 3]);
});

Deno.test("queue.clone should clone the queue in a new instance", () => {
  const queue = new Queue(1, 2, 3);
  const clonedQueue = queue.clone();

  assertEquals(clonedQueue.toArray(), [1, 2, 3]);
});

Deno.test("queue.clone should return a new instance of queue when cloning", () => {
  const queue = new Queue(1, 2, 3);
  const clonedQueue = queue.clone();

  assertNotStrictEquals(clonedQueue, queue);
});

Deno.test("queue.clone should by default return the same entries while cloning", () => {
  const queue = new Queue({ a: 1 });
  const clonedQueue = queue.clone();

  assertEquals(clonedQueue.peekLeft(), queue.peekLeft());
});

Deno.test("queue.clone should use the cloneEntry callback, if provided, while cloning", () => {
  const queue = new Queue({ a: 1 });
  const clonedQueue = queue.clone((e) => ({ ...e }));

  // reference inequality
  assertNotStrictEquals(clonedQueue.peekLeft(), queue.peekLeft());
  // value equality
  assertEquals(clonedQueue.peekLeft(), queue.peekLeft());
});

Deno.test("queue.map should map entries of the queue to different form", () => {
  const queue = new Queue(1, 2, 3, 4);
  const squares = queue.map((e) => e * e);
  assertEquals(squares.toArray(), [1, 4, 9, 16]);
});

Deno.test("queue.map should return the same entries if map function is not provided", () => {
  const queue = new Queue(1, 2, 3);
  const newQueue = queue.map();
  assertEquals(newQueue.toArray(), [1, 2, 3]);
});

Deno.test("queue.filter should provide a method to filter out entries from a queue", () => {
  const queue = new Queue(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const odds = queue.filter(isOdd);
  assertEquals(odds.toArray(), [1, 3, 5, 7, 9]);
});

Deno.test("queue.filter should return all the entries if filterFn is not provided", () => {
  const queue = new Queue(1, 2, 3);
  const filteredQueue = queue.filter();
  assertEquals(filteredQueue.toArray(), [1, 2, 3]);
});
