import { SortingAlgorithm } from './SortingAlgorithm';

import {
  BubbleSortSortingAlgorithm,
  MergeSortSortingAlgorithm,
  SelectionSortSortingAlgorithm,
  InsertionSortSortingAlgorithm,
} from './SortingAlgorithmImpls';

export { SortingVisualizerGame } from './Game';
export { SortingAlgorithm } from './SortingAlgorithm';

export const sortingAlgorithms = [
  { displayName: 'Bubble sort', algorithmFactory: () => new BubbleSortSortingAlgorithm() },
  { displayName: 'Merge sort', algorithmFactory: () => new MergeSortSortingAlgorithm() },
  { displayName: 'Selection sort', algorithmFactory: () => new SelectionSortSortingAlgorithm() },
  { displayName: 'Insertion sort', algorithmFactory: () => new InsertionSortSortingAlgorithm() },
] satisfies Array<{ displayName: string; algorithmFactory: () => SortingAlgorithm }>;
