import { describe, expect, it } from 'vitest';
import { Stack } from './stack';

describe('Data Structures > Stack tests', () => {
  it('should allow to initialize the stack', () => {
    const stack = new Stack(1, 2, 3);
    expect(stack).toBeDefined();
  });

  it('should allow to convert the stack into an array', () => {
    const stack = new Stack(1, 2, 3, 4);
    expect(stack.toArray()).toStrictEqual([1, 2, 3, 4]);
  });

  it('should allow to push entries to the stack', () => {
    const stack = new Stack(1);
    stack.push(2, 3);
    expect(stack.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to pop out entries from the stack', () => {
    const stack = new Stack(1, 2, 3, 4, 5, 6);
    stack.pop();
    expect(stack.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('should return the popped element', () => {
    const stack = new Stack(1, 2, 3, 4);
    const poppedElement = stack.pop();
    expect(poppedElement).toBe(4);
  });

  it('should throw if trying to pop from an empty stack', () => {
    const stack = new Stack();
    expect(() => stack.pop()).toThrowErrorMatchingInlineSnapshot(`"Stack is empty"`);
  });

  it('should allow to peek into the stack', () => {
    const stack = new Stack(1, 2, 3);
    const peekedElement = stack.peek();
    expect(peekedElement).toBe(3);
  });

  it('should not modify the stack when peeking into it', () => {
    const stack = new Stack(1, 2, 3);
    stack.peek();
    expect(stack.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should throw if peeking into an empty stack', () => {
    const stack = new Stack();
    expect(() => stack.peek()).toThrowErrorMatchingInlineSnapshot(`"Stack is empty"`);
  });

  it('should return the size of the stack as 0 if empty', () => {
    const stack = new Stack();
    expect(stack.size).toBe(0);
  });

  it('should return the correct size of stack if stack has entries', () => {
    const stack = new Stack(1, 2, 3, 4);
    expect(stack.size).toBe(4);
  });

  it('should allow to reverse the stack', () => {
    const stack = new Stack(1, 2, 3, 4);
    const reversedStack = stack.reverse();
    expect(reversedStack.toArray()).toStrictEqual([4, 3, 2, 1]);
  });

  it('should not update the source stack when reversing', () => {
    const stack = new Stack(1, 2, 3, 4);
    stack.reverse();
    expect(stack.toArray()).toStrictEqual([1, 2, 3, 4]);
  });

  it('should allow to clone the stack', () => {
    const stack = new Stack(1, 2, 3, 4);
    const clonedStack = stack.clone();
    expect(clonedStack.toArray()).toStrictEqual([1, 2, 3, 4]);
  });

  it('should return a new instance of the stack when cloning', () => {
    const stack = new Stack(1, 2, 3);
    const clonedStack = stack.clone();
    expect(clonedStack).not.toBe(stack);
  });

  it('should use the clonedEntry callback if provided', () => {
    const stack = new Stack({ a: 1 });
    const clonedStack = stack.clone((e) => ({ ...e }));
    expect(clonedStack.peek()).toStrictEqual(stack.peek());
  });

  it('should map the stack entries to the new form', () => {
    const stack = new Stack(1, 2, 3);
    const squaresStack = stack.map((e) => e * e);
    expect(squaresStack.toArray()).toStrictEqual([1, 4, 9]);
  });

  it('should use the default map callback if not provided', () => {
    const stack = new Stack(1, 2, 3);
    const newStack = stack.map();
    expect(newStack.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should filter out entries based on the predicate', () => {
    const stack = new Stack(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    const evens = stack.filter((e) => e % 2 === 0);
    expect(evens.toArray()).toStrictEqual([2, 4, 6, 8, 10]);
  });

  it('should use the default filter function if predicate is not provided', () => {
    const stack = new Stack(1, 2, 3);
    const filteredStack = stack.filter();
    expect(filteredStack.toArray()).toStrictEqual([1, 2, 3]);
  });
});
