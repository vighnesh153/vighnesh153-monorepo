<script lang="ts">
  import { GridPathFinderGameManager, GridPathFinderGame, getCellColor } from '@vighnesh153/graphics-programming';
  import { range, sleep } from '@vighnesh153/tools';
  import { onMount } from 'svelte';

  import Button from '@/components/Button.svelte';

  const cellSize = 15;

  let rows: number;
  let cols: number;
  let mounted = false;
  let container: HTMLDivElement;
  let game: GridPathFinderGame;
  let gameManager: GridPathFinderGameManager;

  function createNewGame() {
    return GridPathFinderGame.createNewWithDefaults(rows, cols);
  }

  onMount(() => {
    const rect = container.getBoundingClientRect();
    cols = Math.floor(rect.width / cellSize - 1);
    rows = Math.floor((window.innerHeight - rect.top) / cellSize - 10);
    game = createNewGame();
    gameManager = new GridPathFinderGameManager(game);
    mounted = true;
  });

  function solve() {
    const frames = gameManager.solve();

    function showNextFrame() {
      const nextFrame = frames.next();
      game = game;

      if (!nextFrame.done) {
        requestAnimationFrame(async () => {
          await sleep(50);
          showNextFrame();
        });
      }
    }

    showNextFrame();
  }

  function randomize() {
    game = createNewGame();
    gameManager.randomize(game);
  }
</script>

<div class="flex justify-center gap-2">
  <Button variant="primary" on:click={solve}>Solve</Button>
  <Button on:click={randomize}>Randomize</Button>
</div>

<div class="mt-6 border box-border border-text" bind:this={container} style={`width: ${cellSize * cols + 2}px`}>
  {#if mounted}
    {#each range(0, rows - 1) as row}
      <div class="w-fit flex justify-center">
        {#each range(0, cols - 1) as col}
          <div
            class="border border-secondary shrink-0 box-border"
            style={`width: ${cellSize}px; height: ${cellSize}px; background: ${getCellColor(game, row, col)}`}
          />
        {/each}
      </div>
    {/each}
  {/if}
</div>
