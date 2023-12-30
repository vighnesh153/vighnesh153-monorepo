import { StackNode } from './stackNode';

/**
 * Implementation of the Stack data structure
 *
 * @typeParam T - type of the entries in the stack
 */
export class Stack<T> {
  private stackSize = 0;

  /**
   * Points to the top of the stack
   */
  private head: StackNode<T> | null = null;

  /**
   * @param entries - Initialize the stack with these entries
   */
  constructor(...entries: T[]) {
    this.push(...entries);
  }

  /**
   * Get the size of the stack
   */
  get size(): number {
    return this.stackSize;
  }

  /**
   * Checks if the stack has any elements
   */
  get isEmpty(): boolean {
    return this.stackSize === 0;
  }

  /**
   * Returns the element at the top of the stack
   *
   * @throws error if stack is empty
   */
  peek(): T {
    if (this.head === null) {
      throw new Error('Stack is empty');
    }
    return this.head.entry;
  }

  /**
   * Push entries to the top of the stack
   *
   * @param entries - entries to be added to the stack
   */
  push(...entries: T[]): void {
    entries.forEach((entry) => this.pushOne(entry));
  }

  /**
   * Pop out the topmost entry from the stack
   *
   * @throws Will throw error if stack is empty
   */
  pop(): T {
    if (this.head === null) {
      throw new Error('Stack is empty');
    }

    // Decrement the stack size
    this.stackSize -= 1;

    // Remove the node and set head to the next node
    const toRemoveNode = this.head;
    this.head = toRemoveNode.pointsTo;

    // Return the node's value
    return toRemoveNode.entry;
  }

  /**
   * Returns a new stack with entries in reverse order
   */
  reverse(): Stack<T> {
    return new Stack<T>(...this.toArray().reverse());
  }

  /**
   * Creates and returns an array with the entries from this stack. First entry will be the first element in the array
   */
  toArray(): T[] {
    let currentNode = this.head;
    return (
      Array.from({ length: this.size })
        .map(() => {
          const returnValue = currentNode!.entry;
          currentNode = currentNode!.pointsTo;
          return returnValue;
        })
        // Should return in reverse as we want the order to be from bottom to top of the stack
        .reverse()
    );
  }

  /**
   * Clones the stack instance.
   *
   * @param cloneIndividualEntry - Callback to clone the entry.
   * By default, returns the same entry
   */
  clone(cloneIndividualEntry: (entry: T) => T = (entry) => entry): Stack<T> {
    return this.map(cloneIndividualEntry);
  }

  /**
   * Map every element of the stack to a different form.
   *
   * @typeParam Q - return type of the map function
   * @param mapFn - Map the stack elements to a new form
   */
  map<Q>(mapFn: (entry: T) => Q = (e) => e as unknown as Q): Stack<Q> {
    const newStack = new Stack<Q>();
    newStack.push(...this.toArray().map(mapFn));
    return newStack;
  }

  /**
   * Filter out entries from the stack
   *
   * @param filterFn - A predicate, which will be applied to all the
   * entries. If returns true, the entry will be added to the new stack,
   * else, will be skipped
   */
  filter(filterFn: (entry: T) => boolean = () => true): Stack<T> {
    const filteredStack = new Stack<T>();
    filteredStack.push(...this.toArray().filter(filterFn));
    return filteredStack;
  }

  /**
   * Pushes one entry to the stack
   *
   * @param entry - new entry to be pushed to the top of the stack
   */
  private pushOne(entry: T): void {
    const newNode = new StackNode(entry);
    this.stackSize += 1;

    // stack is empty
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    // stack has at least 1 entry
    newNode.pointsTo = this.head;
    this.head = newNode;
  }
}
