import type { CanvasWrapper } from "../canvas_wrapper.ts";
import { TreeNodeEdge } from "./edge.ts";
import type { TreeNode } from "./tree_node.ts";

export function createTreeNodeEdges(
  canvasWrapper: CanvasWrapper,
  rootNode: TreeNode,
  result: TreeNodeEdge[] = [],
): TreeNodeEdge[] {
  for (const child of rootNode.children) {
    result.push(new TreeNodeEdge(canvasWrapper, rootNode, child));
    createTreeNodeEdges(canvasWrapper, child, result);
  }
  return result;
}
