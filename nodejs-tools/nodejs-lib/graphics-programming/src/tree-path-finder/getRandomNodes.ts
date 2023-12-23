import { Queue, not, shuffle } from '@vighnesh153/utils';
import { TreeNode } from './TreeNode';

export function getRandomNodes(rootNode: TreeNode, count = 1): TreeNode[] {
  const allNodes: TreeNode[] = [];
  const queue = new Queue<TreeNode>(rootNode);
  while (not(queue.isEmpty)) {
    const treeNode = queue.popLeft();
    allNodes.push(treeNode);
    queue.pushRight(...treeNode.children);
  }
  return shuffle(allNodes).slice(0, count);
}
