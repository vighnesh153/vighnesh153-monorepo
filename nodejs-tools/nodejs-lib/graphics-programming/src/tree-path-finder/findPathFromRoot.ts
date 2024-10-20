import { TreeNode } from "./TreeNode.ts";

export function findPathFromRoot(treeNode: TreeNode): TreeNode[] {
  const path: TreeNode[] = [];
  let currentNode: TreeNode | null = treeNode;
  while (currentNode !== null) {
    path.push(currentNode);
    currentNode = currentNode.parentNode;
  }
  return path.toReversed();
}
