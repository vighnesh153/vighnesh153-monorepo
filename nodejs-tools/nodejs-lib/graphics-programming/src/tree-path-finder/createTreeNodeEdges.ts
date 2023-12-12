import { CanvasWrapper } from '@/canvas-wrapper';
import { TreeNodeEdge } from './Edge';
import { TreeNode } from './TreeNode';

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
