import { type Properties } from 'csstype';

export const cellColors = {
  emptyCell: 'white',
  startCell: 'green',
  endCell: 'red',
  visitedCell: 'lightblue',
  wallCell: 'black',
  currentPointer: 'yellow',
  belongsToShortedPath: 'yellow',
} satisfies Record<string, Properties['color']>;
