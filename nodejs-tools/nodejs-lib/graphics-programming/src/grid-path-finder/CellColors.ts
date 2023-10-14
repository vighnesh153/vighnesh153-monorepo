import { type Properties } from 'csstype';
import { GridPathFinderGame } from './Game';

const gridPathFinderCellColors = {
  emptyCell: 'white',
  startCell: 'hsla(120, 100%, 47%, 1)', // green
  endCell: 'hsla(351, 100%, 55%, 1)', // red
  visitedCell: 'lightblue',
  wallCell: 'black',
  currentPointer: 'yellow',
  belongsToShortedPath: 'yellow',
} satisfies Record<string, Properties['color']>;

function getCell(game: GridPathFinderGame, row: number, col: number) {
  return game?.getCell(row, col) ?? null;
}

export function getCellColor(game: GridPathFinderGame, row: number, col: number): string {
  const cell = getCell(game, row, col);
  if (cell === null) return 'transparent';

  if (cell.isStart) return gridPathFinderCellColors.startCell;
  if (cell.isEnd) return gridPathFinderCellColors.endCell;
  if (cell.isWall) return gridPathFinderCellColors.wallCell;
  if (game.getCurrentPointerCellId() === cell.id) return gridPathFinderCellColors.currentPointer;
  if (game.isCellPartOfSolutionPath(cell)) return gridPathFinderCellColors.belongsToShortedPath;
  if (game.isCellVisited(cell)) return gridPathFinderCellColors.visitedCell;
  return gridPathFinderCellColors.emptyCell;
}
