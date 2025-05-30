import { not, Queue } from "@vighnesh153/tools";
import type { CanvasWrapper } from "../canvas_wrapper.ts";
import type { TreeNode } from "./tree_node.ts";

export function populateTreeNodePositions(
  rootNode: TreeNode,
  depth: number,
  canvasWrapper: CanvasWrapper,
) {
  const nodes = new Queue({ node: rootNode, level: 1 });
  const nodesPerLevel = new Map<number, TreeNode[]>();
  while (not(nodes.isEmpty)) {
    const { node, level } = nodes.popLeft();

    nodesPerLevel.set(level, nodesPerLevel.get(level) ?? []);
    nodesPerLevel.get(level)!.push(node);

    for (const child of node.children) {
      nodes.pushRight({
        node: child,
        level: level + 1,
      });
    }
  }

  const h = canvasWrapper.height / (depth + 1);
  Array.from(nodesPerLevel.keys()).forEach((level) => {
    const nodesAtLevel = nodesPerLevel.get(level) ?? [];
    const w = canvasWrapper.width / (nodesAtLevel.length + 1);
    for (let i = 0; i < nodesAtLevel.length; i++) {
      const node = nodesAtLevel[i];
      node.setPosition({
        x: w * (i + 1),
        y: h * level,
      });
    }
  });
}
