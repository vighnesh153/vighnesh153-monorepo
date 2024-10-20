import { TreeNode } from './TreeNode.ts';

interface SearchResult {
  foundStart: boolean;
  foundEnd: boolean;
}

function foundBoth(searchResult: SearchResult): boolean {
  return searchResult.foundStart && searchResult.foundEnd;
}

export function* searchBothNodes(
  root: TreeNode,
  startNode: TreeNode,
  endNode: TreeNode,
  searchResult: SearchResult = { foundStart: false, foundEnd: false }
): Iterable<unknown> {
  if (root !== startNode && root !== endNode) {
    root.updateState('visited');
    yield;
  }

  searchResult.foundStart ||= root === startNode;
  searchResult.foundEnd ||= root === endNode;

  if (foundBoth(searchResult)) {
    return;
  }

  for (const child of root.children) {
    yield* searchBothNodes(child, startNode, endNode, searchResult);
  }
}
