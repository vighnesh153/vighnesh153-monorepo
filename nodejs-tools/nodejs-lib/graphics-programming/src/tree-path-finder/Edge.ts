import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { TreeNode } from "./TreeNode.ts";

interface ConfigOptions {
  color?: string;
  thinkness?: number;
}

export class TreeNodeEdge {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #node1: TreeNode;
  readonly #node2: TreeNode;

  readonly #color: string;
  readonly #thickness: number;

  constructor(
    canvasWrapper: CanvasWrapper,
    node1: TreeNode,
    node2: TreeNode,
    options: ConfigOptions = {},
  ) {
    this.#canvasWrapper = canvasWrapper;
    this.#node1 = node1;
    this.#node2 = node2;

    this.#color = options.color ?? "green";
    this.#thickness = options.thinkness ?? 2;
  }

  draw() {
    const pos1 = this.#node1.position;
    const pos2 = this.#node2.position;
    if (pos1 === null || pos2 === null) {
      return;
    }
    this.#canvasWrapper.drawLine(
      pos1.x,
      pos1.y,
      pos2.x,
      pos2.y,
      this.#thickness,
      this.#color,
    );
  }
}
