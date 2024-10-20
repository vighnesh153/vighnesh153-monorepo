import { CanvasWrapper } from '@/canvas-wrapper.ts';
import { TreeNodeEdge } from './Edge.ts';
import { TreeNode } from './TreeNode.ts';

export function createTreeNodeEdges(
  canvasWrapper: CanvasWrapper,
  rootNode: TreeNode,
  result: TreeNodeEdge[] = []
): TreeNodeEdge[] {
  for (const child of rootNode.children) {
    result.push(new TreeNodeEdge(canvasWrapper, rootNode, child));
    createTreeNodeEdges(canvasWrapper, child, result);
  }
  return result;
}
