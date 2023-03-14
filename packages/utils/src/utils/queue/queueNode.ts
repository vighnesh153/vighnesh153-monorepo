/**
 * @internal
 */
export class QueueNode<T> {
  public leftPointsTo: QueueNode<T> | null = null;

  public rightPointsTo: QueueNode<T> | null = null;

  public value: T;

  constructor(value: T) {
    this.value = value;
  }
}
