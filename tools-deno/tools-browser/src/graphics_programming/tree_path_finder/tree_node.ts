import type { CanvasWrapper } from "../canvas_wrapper.ts";
import type { Position } from "./position.ts";

interface TreeNodeOptions {
  defaultColor?: string;
  visitedColor?: string;
  /**
   * Color to be applied if the node is part of the shorted path between 2 desired nodes
   */
  pathColor?: string;
  destinationColor?: string;

  defaultRadius?: number;
  visitedRadius?: number;
  pathRadius?: number;
}

type TreeNodeState = "default" | "visited" | "path" | "destination";

export class TreeNode {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #children: TreeNode[] = [];

  readonly #defaultColor: string;
  readonly #visitedColor: string;
  readonly #pathColor: string;
  readonly #destinationColor: string;

  readonly #defaultRadius: number;
  readonly #visitedRadius: number;
  readonly #pathRadius: number;

  readonly parentNode: TreeNode | null = null;

  #position: Position | null = null;

  #state: TreeNodeState = "default";

  get children(): TreeNode[] {
    return [...this.#children];
  }

  get isDestination(): boolean {
    return this.#state === "destination";
  }

  get position(): Position | null {
    if (this.#position === null) {
      return null;
    }
    return { ...this.#position };
  }

  constructor(
    canvasWrapper: CanvasWrapper,
    parentNode: TreeNode | null,
    options: TreeNodeOptions = {},
  ) {
    this.#canvasWrapper = canvasWrapper;
    this.parentNode = parentNode;

    this.#defaultColor = options.defaultColor ?? "green";
    this.#visitedColor = options.visitedColor ?? "deepskyblue";
    this.#pathColor = options.pathColor ?? "yellow";
    this.#destinationColor = options.destinationColor ?? "red";

    this.#defaultRadius = options.defaultRadius ?? 4;
    this.#visitedRadius = options.visitedRadius ?? 6;
    this.#pathRadius = options.pathRadius ?? 8;
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
    const color = this.getColor();
    const radius = this.getRadius();

    this.#canvasWrapper.drawFilledCircle(x, y, radius, color);
  }

  updateState(newState: TreeNodeState): void {
    this.#state = newState;
  }

  private getColor(): string {
    switch (this.#state) {
      case "destination":
        return this.#destinationColor;
      case "path":
        return this.#pathColor;
      case "visited":
        return this.#visitedColor;
      default:
        return this.#defaultColor;
    }
  }

  private getRadius(): number {
    switch (this.#state) {
      case "destination":
      case "path":
        return this.#pathRadius;
      case "visited":
        return this.#visitedRadius;
      default:
        return this.#defaultRadius;
    }
  }
}
