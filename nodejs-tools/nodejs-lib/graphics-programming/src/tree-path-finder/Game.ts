import { Queue, not } from '@vighnesh153/utils';
import { CanvasWrapper } from '@/canvas-wrapper';
import { getCanvasBgColor } from '@/getCanvasBgColor';
import { TreeNode } from './TreeNode';
import { populateTreeNodePositions } from './populateTreeNodePositions';
import { createTreeStructure } from './createTreeStructure';
import { TreeNodeEdge } from './Edge';
import { createTreeNodeEdges } from './createTreeNodeEdges';

interface GameOptions {
  bgColor?: string;
  depth?: number;
}

export class TreePathFinderGame {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #bgColor: string;
  readonly #depth: number;

  readonly #rootNode: TreeNode;
  readonly #treeNodeEdges: TreeNodeEdge[];
  #isRunning = false;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;
    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.#depth = options.depth ?? 7;

    const rootNode = createTreeStructure(this.#canvasWrapper, 1, this.#depth);
    if (rootNode == null) {
      throw new Error(`Depth should be an integer >= 1`);
    }
    this.#rootNode = rootNode;
    populateTreeNodePositions(this.#rootNode, this.#depth, this.#canvasWrapper);
    this.#treeNodeEdges = createTreeNodeEdges(this.#canvasWrapper, rootNode);
  }

  *start() {
    this.#isRunning = true;
    this.draw();
    yield;
  }

  stop() {
    this.#isRunning = false;
  }

  draw() {
    this.drawEdges();
    this.drawTreeNodes();
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(0, 0, canvasWidth, canvasHeight, this.#bgColor);
  }

  private drawTreeNodes(): void {
    const nodes = new Queue<TreeNode>();
    nodes.pushRight(this.#rootNode);

    while (not(nodes.isEmpty)) {
      const node = nodes.popLeft();
      node.draw();
      for (const child of node.children) {
        nodes.pushRight(child);
      }
    }
  }

  private drawEdges(): void {
    this.#treeNodeEdges.forEach((edge) => {
      edge.draw();
    });
  }
}
