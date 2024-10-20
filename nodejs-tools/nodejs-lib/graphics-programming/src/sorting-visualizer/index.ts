import { SortingAlgorithm } from "./SortingAlgorithm.ts";

import {
  BubbleSortSortingAlgorithm,
  InsertionSortSortingAlgorithm,
  MergeSortSortingAlgorithm,
  SelectionSortSortingAlgorithm,
} from "./SortingAlgorithmImpls.ts";

export { SortingVisualizerGame } from "./Game.ts";
export { SortingAlgorithm } from "./SortingAlgorithm.ts";

export const sortingAlgorithms = [
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
] satisfies Array<
  { displayName: string; algorithmFactory: () => SortingAlgorithm }
>;
