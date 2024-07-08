/**
 * Comparison result between 2 elements. Returned result's meaning: <br>
 * -1: first element gets more priority <br>
 * 0: both elements have same priority <br>
 * 1: element-2 gets more priority <br>
 */
export type HeapComparison = -1 | 0 | 1;

/**
 * Type of the compare function. In the return-type,
 * the parent should hold the element which should be the parent
 * of the other element.
 *
 * @typeParam T - type of entry
 */
export type HeapCompareFn<T> = (el1: T, el2: T) => HeapComparison;

function defaultCompareFn<T>(el1: T, el2: T): HeapComparison {
  return el1 <= el2 ? -1 : 1;
}

/**
 * Heap implementation as an array
 *
 * @typeParam T - type of the elements in the heap instance
 */
export class Heap<T> {
  private readonly items: T[];

  private readonly compareFn: HeapCompareFn<T>;

  /**
   * Returns the count of elements in the heap
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Returns true/false based on if there are elements in the heap
   */
  get isEmpty(): boolean {
    return this.size === 0;
  }

  constructor(initialIterable: Iterable<T> = [], compareFn: HeapCompareFn<T> = defaultCompareFn) {
    this.items = Array.from(initialIterable);
    this.compareFn = compareFn;

    this.heapify();
  }

  /**
   * Add an entry to the heap
   *
   * @param entries - All the elements to be added to the heap
   */
  push(...entries: T[]): void {
    entries.forEach((entry) => {
      this.items.push(entry);
      this.siftUp(this.items.length - 1);
    });
  }

  /**
   * Returns and removes the top element from the heap
   */
  pop(): T {
    if (this.size === 0) {
      throw new Error('Heap is empty');
    }
    if (this.size === 1) {
      return this.items.pop() as T;
    }

    // Element to be removed
    // eslint-disable-next-line prefer-destructuring
    const topElement = this.items[0];

    // Last element will replace the first position
    this.items[0] = this.items.pop() as T;

    // siftDown to make it go in the correct place
    this.siftDown(0);

    return topElement;
  }

  /**
   * Returns the top element from the heap
   */
  peek(): T {
    const peekElement = this.pop();
    this.push(peekElement);
    return peekElement;
  }

  /**
   * Converts the heap to a sorted array (Heap sort implementation)
   */
  toSortedArray(): T[] {
    const result: T[] = [];
    const heap = new Heap(this.items, this.compareFn);
    while (heap.size > 0) {
      result.push(heap.pop());
    }
    return result;
  }

  /**
   * Runs the heapify algorithm on the items iterable
   */
  private heapify(): void {
    for (let i = this.items.length - 1; i >= 0; i -= 1) {
      this.siftDown(i);
    }
  }

  /**
   * Sifts the element at "startPosition" till the top of the heap tree.
   *
   * @param startPosition - Sift up from this position
   */
  private siftUp(startPosition: number): void {
    const calculateNextIndices = (newCurrentIndex: number) => ({
      newCurrentIndex,
      newParentIndex: Math.ceil(newCurrentIndex / 2) - 1,
    });

    // Initial set of indices
    let nextIndices = calculateNextIndices(startPosition);
    let currentIndex = nextIndices.newCurrentIndex;
    let parentIndex = nextIndices.newParentIndex;

    while (currentIndex > 0) {
      // Grab the elements
      const currentEl = this.items[currentIndex];
      const parentEl = this.items[parentIndex];

      // Compare them and see which needs to go up and which needs to go down
      const compareResult = this.compareFn(currentEl, parentEl);

      // Update the items array based on the result above
      if (compareResult === -1) {
        // CurrentEl gets more priority
        this.items[parentIndex] = currentEl;
        this.items[currentIndex] = parentEl;
      } else {
        // ParentEl gets more priority
        this.items[parentIndex] = parentEl;
        this.items[currentIndex] = currentEl;
      }

      // Update the indices
      nextIndices = calculateNextIndices(parentIndex);
      currentIndex = nextIndices.newCurrentIndex;
      parentIndex = nextIndices.newParentIndex;
    }
  }

  /**
   * Sifts the element at "startPosition" till the bottom of the heap tree.
   *
   * @param startPosition - Sift down from this position
   */
  private siftDown(startPosition: number): void {
    const calculateNextIndices = (newCurrentIndex: number) => {
      const leftChildIndex = 2 * newCurrentIndex + 1;
      const rightChildIndex = leftChildIndex + 1;

      let newChildIndex = leftChildIndex;

      // If right child index is in bounds
      if (rightChildIndex < this.items.length) {
        const leftChild = this.items[leftChildIndex];
        const rightChild = this.items[rightChildIndex];
        const compareResult = this.compareFn(leftChild, rightChild);
        if (compareResult > 0) {
          // Right child has more priority
          newChildIndex = rightChildIndex;
        }
      }

      return {
        newCurrentIndex,
        newChildIndex,
      };
    };

    // Initial set of indices
    let nextIndices = calculateNextIndices(startPosition);
    let currentIndex = nextIndices.newCurrentIndex;
    let childIndex = nextIndices.newChildIndex;

    while (childIndex < this.items.length) {
      // Grab the elements
      const currentEl = this.items[currentIndex];
      const childEl = this.items[childIndex];

      // Compare them and see which needs to go up and which needs to go down
      const compareResult = this.compareFn(currentEl, childEl);

      if (compareResult >= 0) {
        // ParentEl gets more priority
        this.items[currentIndex] = childEl;
        this.items[childIndex] = currentEl;
      }

      // Update the indices
      nextIndices = calculateNextIndices(childIndex);
      currentIndex = nextIndices.newCurrentIndex;
      childIndex = nextIndices.newChildIndex;
    }
  }
}
