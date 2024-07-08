import { describe, expect, it } from 'vitest';
import { Queue } from './queue';

describe('Data Structures > Queue tests', () => {
  it('should allow to initialize', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue).toBeDefined();
  });

  it('should allow to convert the queue to an array', () => {
    const queue = new Queue(1, 2, 3, 4, 5);

    expect(queue.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('should return 0 for size if the queue has no entries', () => {
    const queue = new Queue();

    expect(queue.size).toBe(0);
  });

  it('should return correct size of the queue if queue has entries', () => {
    const queue = new Queue(1, 2, 3, 4, 5, 6);

    expect(queue.size).toBe(6);
  });

  it('should return true for isEmpty if queue has no entries', () => {
    const queue = new Queue();

    expect(queue.isEmpty).toBe(true);
  });

  it('should return false for isEmpty if queue has entries', () => {
    const queue = new Queue(1, 2, 3, 4);

    expect(queue.isEmpty).toBe(false);
  });

  it('should allow to push multiple entries to the queue from right', () => {
    const queue = new Queue();
    queue.pushRight(1, 2, 3);

    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to push multiple entries to the queue from left', () => {
    const queue = new Queue();
    queue.pushLeft(1, 2, 3, 4);

    expect(queue.toArray()).toStrictEqual([4, 3, 2, 1]);
  });

  it('should allow to peek an element from the left', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.peekLeft()).toBe(1);
  });

  it('should not modify the queue elements if peeked from left', () => {
    const queue = new Queue(1, 2, 3);
    queue.peekLeft();
    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should throw if peekLeft is invoked on an empty Queue', () => {
    const queue = new Queue();
    expect(() => queue.peekLeft()).toThrowErrorMatchingInlineSnapshot(`[Error: Queue is empty]`);
  });

  it('should allow to peek an element from the right', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.peekRight()).toBe(3);
  });

  it('should not modify the queue elements if peeked from right', () => {
    const queue = new Queue(1, 2, 3);
    queue.peekRight();
    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should throw if peekRight is invoked on an empty Queue', () => {
    const queue = new Queue();
    expect(() => queue.peekRight()).toThrowErrorMatchingInlineSnapshot(`[Error: Queue is empty]`);
  });

  it('should return the popped element from the left', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.popLeft()).toBe(1);
  });

  it('should remove the popped element from the left', () => {
    const queue = new Queue(1, 2, 3);
    queue.popLeft();
    expect(queue.toArray()).toStrictEqual([2, 3]);
  });

  it('should set the size of the queue to 0, if popLeft is invoked on a queue with 1 entry', () => {
    const queue = new Queue(1);
    queue.popLeft();
    expect(queue.size).toBe(0);
  });

  it('should throw if popLeft is invoked on an empty queue', () => {
    const queue = new Queue();
    expect(() => queue.popLeft()).toThrowErrorMatchingInlineSnapshot(`[Error: Queue is empty]`);
  });

  it('should return the popped element from the right', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.popRight()).toBe(3);
  });

  it('should remove the popped element from the right', () => {
    const queue = new Queue(1, 2, 3);
    queue.popRight();
    expect(queue.toArray()).toStrictEqual([1, 2]);
  });

  it('should set the size of the queue to 0, if popRight is invoked on a queue with 1 entry', () => {
    const queue = new Queue(1);
    queue.popRight();
    expect(queue.size).toBe(0);
  });

  it('should throw if popRight is invoked on an empty queue', () => {
    const queue = new Queue();
    expect(() => queue.popRight()).toThrowErrorMatchingInlineSnapshot(`[Error: Queue is empty]`);
  });

  it('should allow to reverse a queue', () => {
    const queue = new Queue(1, 2, 3);
    const reversedQueue = queue.reverse();

    expect(reversedQueue.toArray()).toStrictEqual([3, 2, 1]);
  });

  it('should not modify the existing queue when reverse is invoked', () => {
    const queue = new Queue(1, 2, 3);
    queue.reverse();

    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to clone the queue in a new instance', () => {
    const queue = new Queue(1, 2, 3);
    const clonedQueue = queue.clone();

    expect(clonedQueue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should return a new instance of queue when cloning', () => {
    const queue = new Queue(1, 2, 3);
    const clonedQueue = queue.clone();

    expect(clonedQueue).not.toBe(queue);
  });

  it('should by default return the same entries while cloning', () => {
    const queue = new Queue({ a: 1 });
    const clonedQueue = queue.clone();

    expect(clonedQueue.peekLeft()).toBe(queue.peekLeft());
  });

  it('should use the cloneEntry callback, if provided, while cloning', () => {
    const queue = new Queue({ a: 1 });
    const clonedQueue = queue.clone((e) => ({ ...e }));

    expect(clonedQueue.peekLeft()).toStrictEqual(queue.peekLeft());
  });

  it('should provide a method to map entries of the queue to different form', () => {
    const queue = new Queue(1, 2, 3, 4);
    const squares = queue.map((e) => e * e);
    expect(squares.toArray()).toStrictEqual([1, 4, 9, 16]);
  });

  it('should return the same entries if map function is not provided', () => {
    const queue = new Queue(1, 2, 3);
    const newQueue = queue.map();
    expect(newQueue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should provide a method to filter out entries from a queue', () => {
    const queue = new Queue(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    const odds = queue.filter((entry) => entry % 2 === 1);
    expect(odds.toArray()).toStrictEqual([1, 3, 5, 7, 9]);
  });

  it('should return all the entries if filterFn is not provided', () => {
    const queue = new Queue(1, 2, 3);
    const filteredQueue = queue.filter();
    expect(filteredQueue.toArray()).toStrictEqual([1, 2, 3]);
  });
});
