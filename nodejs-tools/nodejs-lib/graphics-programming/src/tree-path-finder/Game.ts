import { not, Queue } from "@vighnesh153/tools";
import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { getCanvasBgColor } from "@/getCanvasBgColor.ts";
import { TreeNode } from "./TreeNode.ts";
import { populateTreeNodePositions } from "./populateTreeNodePositions.ts";
import { createTreeStructure } from "./createTreeStructure.ts";
import { TreeNodeEdge } from "./Edge.ts";
import { createTreeNodeEdges } from "./createTreeNodeEdges.ts";
import { getRandomNodes } from "./getRandomNodes.ts";
import { searchBothNodes } from "./searchBothNodes.ts";
import { findPathFromRoot } from "./findPathFromRoot.ts";
import { findConnectingPath } from "./findConnectingPath.ts";

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

  readonly #startNode: TreeNode;
  readonly #endNode: TreeNode;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;
    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.#depth = options.depth ?? 7;

    const rootNode = createTreeStructure(
      this.#canvasWrapper,
      null,
      1,
      this.#depth,
    );
    if (rootNode == null) {
      throw new Error(`Depth should be an integer >= 1`);
    }
    this.#rootNode = rootNode;
    populateTreeNodePositions(this.#rootNode, this.#depth, this.#canvasWrapper);
    this.#treeNodeEdges = createTreeNodeEdges(this.#canvasWrapper, rootNode);

    [this.#startNode, this.#endNode] = getRandomNodes(rootNode, 2);
    this.#startNode.updateState("destination");
    this.#endNode.updateState("destination");
  }

  *start() {
    this.#isRunning = true;
    for (const frame of this.update()) {
      if (not(this.#isRunning)) {
        break;
      }
      this.clear();
      this.draw();
      yield frame;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  private *update() {
    yield* searchBothNodes(this.#rootNode, this.#startNode, this.#endNode);

    const startNodePath = findPathFromRoot(this.#startNode);
    const endNodePath = findPathFromRoot(this.#endNode);

    const connectingPath = findConnectingPath(startNodePath, endNodePath);
    for (const node of connectingPath) {
      if (node.isDestination) {
        continue;
      }
      node.updateState("path");
      yield;
    }
  }

  private draw() {
    this.drawEdges();
    this.drawTreeNodes();
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(
      0,
      0,
      canvasWidth,
      canvasHeight,
      this.#bgColor,
    );
  }

  private drawTreeNodes(): void {
    const queue = new Queue<TreeNode>(this.#rootNode);

    while (not(queue.isEmpty)) {
      const node = queue.popLeft();
      node.draw();
      queue.pushRight(...node.children);
    }
  }

  private drawEdges(): void {
    this.#treeNodeEdges.forEach((edge) => {
      edge.draw();
    });
  }
}
