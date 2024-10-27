import { not, Queue, shuffleIterable } from "@vighnesh153/tools";
import type { TreeNode } from "./tree_node.ts";

export function getRandomNodes(rootNode: TreeNode, count = 1): TreeNode[] {
  const allNodes: TreeNode[] = [];
  const queue = new Queue<TreeNode>(rootNode);
  while (not(queue.isEmpty)) {
    const treeNode = queue.popLeft();
    allNodes.push(treeNode);
    queue.pushRight(...treeNode.children);
  }
  return shuffleIterable(allNodes).slice(0, count);
}
