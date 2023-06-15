/**
 * Internal class to be used only in stack's class.
 *
 * @internal
 */
export class StackNode<T> {
  public entry: T;

  public pointsTo: StackNode<T> | null = null;

  constructor(entry: T) {
    this.entry = entry;
  }
}
