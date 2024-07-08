import { QueueNode } from './queueNode';

/**
 * Implementation of the Queue Data Structure
 *
 * @typeParam T - type of the entries in the queue
 */
export class Queue<T> {
  private queueSize = 0;

  /**
   * Left point of the queue
   */
  private head: QueueNode<T> | null = null;

  /**
   * Right point of the queue
   */
  private tail: QueueNode<T> | null = null;

  /**
   * @param entries - Initialize the queue with these entries
   */
  constructor(...entries: T[]) {
    this.pushRight(...entries);
  }

  /**
   * Returns the size of the queue
   */
  get size(): number {
    return this.queueSize;
  }

  /**
   * Checks if the queue is empty
   */
  get isEmpty(): boolean {
    return this.queueSize === 0;
  }

  /**
   * Peek at the left most entry of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  peekLeft(): T {
    if (this.head === null) {
      throw new Error('Queue is empty');
    }

    return this.head.value;
  }

  /**
   * Peek at the right most entry of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  peekRight(): T {
    if (this.tail === null) {
      throw new Error('Queue is empty');
    }

    return this.tail.value;
  }

  /**
   * Add new values to the queue from the left
   *
   * @param entries - new values to be added from the left of the queue
   */
  pushLeft(...entries: T[]): void {
    entries.forEach((entry) => this.pushLeftOne(entry));
  }

  /**
   * Add new values to the queue from the right
   *
   * @param entries - new values to be added from the right of the queue
   */
  pushRight(...entries: T[]): void {
    entries.forEach((entry) => this.pushRightOne(entry));
  }

  /**
   * Pop an element from the leftmost side of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  popLeft(): T {
    if (this.head === null) {
      throw new Error('Queue is empty');
    }

    const toBeRemovedNode = this.head;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = toBeRemovedNode.rightPointsTo;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.head!.leftPointsTo = null;
    }

    this.queueSize -= 1;
    return toBeRemovedNode.value;
  }

  /**
   * Pop an element from the rightmost side of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  popRight(): T {
    if (this.tail === null) {
      throw new Error('Queue is empty');
    }

    const toBeRemovedNode = this.tail;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = toBeRemovedNode.leftPointsTo;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.tail!.rightPointsTo = null;
    }

    this.queueSize -= 1;
    return toBeRemovedNode.value;
  }

  /**
   * Creates a new Queue instance with entries in reverse order
   */
  reverse(): Queue<T> {
    const reversedQueue = new Queue<T>();
    reversedQueue.pushRight(...this.toArray().reverse());
    return reversedQueue;
  }

  /**
   * Creates an array instance with the entries from this queue. Order is from left to right.
   */
  toArray(): T[] {
    let currentNode = this.head;
    return Array.from({ length: this.size }).map(() => {
      const returnValue = currentNode!.value;
      currentNode = currentNode!.rightPointsTo;
      return returnValue;
    });
  }

  /**
   * Creates a new Queue object with the same entries in the current queue.
   *
   * @param cloneIndividualEntry - Callback to clone the entry. Useful if you want
   * to deep-clone the queue. By default, returns the same entry.
   */
  clone(cloneIndividualEntry: (entry: T) => T = (entry) => entry): Queue<T> {
    return this.map(cloneIndividualEntry);
  }

  /**
   * Map the entries in the queue to a new form
   *
   * @typeParam Q - type of the new form of the entry
   * @param mapFn - map the entries in the queue to a new form
   */
  map<Q>(mapFn: (entry: T) => Q = (e) => e as unknown as Q): Queue<Q> {
    const mappedQueue = new Queue<Q>();
    mappedQueue.pushRight(...this.toArray().map(mapFn));
    return mappedQueue;
  }

  /**
   * Filter out the entries from the queue based on a predicate
   *
   * @param filterFn - predicate that accepts an entry as argument.
   * If it returns true, the entry will be picked. Else, not.
   */
  filter(filterFn: (entry: T) => boolean = () => true): Queue<T> {
    const filteredQueue = new Queue<T>();
    filteredQueue.pushRight(...this.toArray().filter(filterFn));
    return filteredQueue;
  }

  /**
   * Add one node to the left of the queue.
   *
   * @param entry - value of the new node
   */
  private pushLeftOne(entry: T): void {
    if (this.createFirstNode(entry)) {
      return;
    }

    this.queueSize += 1;

    const newNode = new QueueNode(entry);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const head = this.head!;
    newNode.rightPointsTo = head;
    head.leftPointsTo = newNode;
    this.head = newNode;
  }

  /**
   * Add one node to the right of the queue.
   *
   * @param entry - value of the new node
   */
  private pushRightOne(entry: T): void {
    if (this.createFirstNode(entry)) {
      return;
    }

    this.queueSize += 1;

    const newNode = new QueueNode(entry);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tail = this.tail!;
    tail.rightPointsTo = newNode;
    newNode.leftPointsTo = tail;
    this.tail = newNode;
  }

  /**
   * Creates the first node in the queue. Returns true if the node
   * is created, else returns false.
   *
   * @param entry - value of the first node
   */
  private createFirstNode(entry: T): boolean {
    if (this.isEmpty) {
      this.queueSize += 1;
      const newNode = new QueueNode(entry);
      this.head = newNode;
      this.tail = newNode;
      return true;
    }
    return false;
  }
}
