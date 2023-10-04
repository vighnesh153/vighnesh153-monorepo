<script lang="ts">
  import {
    GridPathFinderGameManager,
    GridPathFinderGame,
    gridPathFinderCellColors,
  } from '@vighnesh153/graphics-programming';
  import { range } from '@vighnesh153/utils';
  import { onMount } from 'svelte';

  const cellSize = 15;

  let rows: number;
  let cols: number;
  let mounted = false;
  let container: HTMLDivElement;
  let game: GridPathFinderGame;
  let gameManager: GridPathFinderGameManager;

  let visitedCellIds: Set<string> = new Set();
  let solutionPathCellIds: Set<string> = new Set();

  onMount(() => {
    const rect = container.getBoundingClientRect();
    cols = Math.floor(rect.width / cellSize - 1);
    rows = Math.floor((window.innerHeight - rect.top) / cellSize - 10);
    game = GridPathFinderGame.createNewWithDefaults(rows, cols);
    gameManager = new GridPathFinderGameManager(game);
    mounted = true;
  });

  function getCell(row: number, col: number) {
    return game?.getCell(row, col) ?? null;
  }

  function getCellColor(row: number, col: number) {
    const cell = getCell(row, col);
    if (cell === null) return 'transparent';

    if (cell.isStart) return gridPathFinderCellColors.startCell;
    if (cell.isEnd) return gridPathFinderCellColors.endCell;
    if (cell.isWall) return gridPathFinderCellColors.wallCell;
    if (game.getCurrentPointerCellId() === cell.id) return gridPathFinderCellColors.currentPointer;
    if (visitedCellIds.has(cell.id)) return gridPathFinderCellColors.visitedCell;
    if (solutionPathCellIds.has(cell.id)) return gridPathFinderCellColors.belongsToShortedPath;
    return gridPathFinderCellColors.emptyCell;
  }
</script>

<div class="border box-border border-text" bind:this={container} style={`width: ${cellSize * cols + 2}px`}>
  {#if mounted}
    {#each range(0, rows - 1) as row}
      <div class="w-fit flex justify-center">
        {#each range(0, cols - 1) as col}
          <div
            class="border border-secondary shrink-0 box-border"
            style={`width: ${cellSize}px; height: ${cellSize}px; background: ${getCellColor(row, col)}`}
          />
        {/each}
      </div>
    {/each}
  {/if}
</div>
