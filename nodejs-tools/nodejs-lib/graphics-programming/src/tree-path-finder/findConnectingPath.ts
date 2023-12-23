import { TreeNode } from './TreeNode';

// least common ancestor
function findLCA(path1: TreeNode[], path2: TreeNode[]): TreeNode {
  let i = 0;
  while (i < path1.length && i < path2.length) {
    if (path1[i] != path2[i]) {
      break;
    }
    i++;
  }
  if (i >= path1.length) {
    return path1.at(-1)!;
  }
  if (i >= path2.length) {
    return path2.at(-1)!;
  }
  return path1[i - 1];
}

export function findConnectingPath(path1: TreeNode[], path2: TreeNode[]): TreeNode[] {
  const pathFrom1: TreeNode[] = [];
  const pathFrom2: TreeNode[] = [];

  const lca = findLCA(path1, path2);

  for (const node of path1.toReversed()) {
    pathFrom1.push(node);
    if (node === lca) {
      break;
    }
  }

  for (const node of path2.toReversed()) {
    if (node === lca) {
      break;
    }
    pathFrom2.push(node);
  }

  return [...pathFrom1, ...pathFrom2.toReversed()];
}
