import type { SortingAlgorithm } from "./sorting_algorithm.ts";

import {
  BubbleSortSortingAlgorithm,
  InsertionSortSortingAlgorithm,
  MergeSortSortingAlgorithm,
  SelectionSortSortingAlgorithm,
} from "./sorting_algorithm_impl.ts";

export { SortingVisualizerGame } from "./game.ts";
export { SortingAlgorithm } from "./sorting_algorithm.ts";

export const sortingAlgorithms: Array<
  { displayName: string; algorithmFactory: () => SortingAlgorithm }
> = [
  {
    displayName: "Bubble sort",
    algorithmFactory: () => new BubbleSortSortingAlgorithm(),
  },
  {
    displayName: "Merge sort",
    algorithmFactory: () => new MergeSortSortingAlgorithm(),
  },
  {
    displayName: "Selection sort",
    algorithmFactory: () => new SelectionSortSortingAlgorithm(),
  },
  {
    displayName: "Insertion sort",
    algorithmFactory: () => new InsertionSortSortingAlgorithm(),
  },
];
