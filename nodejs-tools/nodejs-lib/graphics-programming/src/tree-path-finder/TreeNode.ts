import { CanvasWrapper } from '@/canvas-wrapper';
import { Position } from './Position';

interface TreeNodeOptions {
  color?: string;
  radius?: number;
}

export class TreeNode {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #children: TreeNode[] = [];

  readonly #color: string;
  readonly #radius: number;

  #position: Position | null = null;

  get children(): TreeNode[] {
    return [...this.#children];
  }

  get position(): Position | null {
    if (this.#position === null) {
      return null;
    }
    return { ...this.#position };
  }

  constructor(canvasWrapper: CanvasWrapper, options: TreeNodeOptions = {}) {
    this.#canvasWrapper = canvasWrapper;

    this.#color = options.color ?? 'green';
    this.#radius = options.radius ?? 4;
  }

  setPosition(position: Position) {
    this.#position = position;
  }

  addChild(child: TreeNode): void {
    this.#children.push(child);
  }

  draw() {
    if (this.#position == null) {
      throw new Error(`Treenode's position is null`);
    }
    const { x, y } = this.#position;
    const color = this.#color;
    const radius = this.#radius;

    this.#canvasWrapper.drawFilledCircle(x, y, radius, color);
  }
}
