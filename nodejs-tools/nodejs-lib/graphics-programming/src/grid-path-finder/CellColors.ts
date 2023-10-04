import { type Properties } from 'csstype';

export const gridPathFinderCellColors = {
  emptyCell: 'white',
  startCell: 'hsla(120, 100%, 47%, 1)', // green
  endCell: 'hsla(351, 100%, 55%, 1)', // red
  visitedCell: 'lightblue',
  wallCell: 'black',
  currentPointer: 'yellow',
  belongsToShortedPath: 'yellow',
} satisfies Record<string, Properties['color']>;
