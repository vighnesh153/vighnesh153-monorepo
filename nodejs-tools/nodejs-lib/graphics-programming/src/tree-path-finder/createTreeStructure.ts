import { CanvasWrapper } from '@/canvas-wrapper';
import { TreeNode } from './TreeNode';

export function createTreeStructure(canvasWrapper: CanvasWrapper, level: number, maxLevel: number): TreeNode | null {
  if (level > maxLevel) {
    return null;
  }

  const node = new TreeNode(canvasWrapper);
  const child1 = createTreeStructure(canvasWrapper, level + 1, maxLevel);
  const child2 = createTreeStructure(canvasWrapper, level + 1, maxLevel);

  if (child1 !== null) {
    node.addChild(child1);
  }
  if (child2 !== null) {
    node.addChild(child2);
  }

  return node;
}
