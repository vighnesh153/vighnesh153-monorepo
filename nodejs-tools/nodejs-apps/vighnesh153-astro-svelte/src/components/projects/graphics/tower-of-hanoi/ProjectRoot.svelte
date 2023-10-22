<script lang="ts">
  import { onMount } from 'svelte';

  import { range, not } from '@vighnesh153/utils';
  import { TowerOfHanoiGame, TowerOfHanoiGameManager, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';

  import Button from '@/components/Button.svelte';

  let canvasElement: HTMLCanvasElement;
  let game: TowerOfHanoiGame;
  let gameManager: TowerOfHanoiGameManager;

  let discCount = 5;

  function start() {
    const frames = gameManager.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
    // this is needed so that the isRunning flag update is notified to svelte
    game = game;
  }

  function initializeNewGame() {
    if (not(canvasElement)) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const bgColor = canvasElement.computedStyleMap().get('background-color')?.toString() ?? 'white';
    game = new TowerOfHanoiGame(canvasWrapper, { bgColor, discCount });
    gameManager = new TowerOfHanoiGameManager(game);
  }

  onMount(() => {
    initializeNewGame();
  });

  $: {
    // this log is needed so that this block runs when discCount changes
    console.log(`Disc count changed: ${discCount}`);
    gameManager?.stop();
    initializeNewGame();
  }
</script>

<div class="flex justify-center items-center gap-20">
  {#if not(game?.isRunning)}
    <Button variant="primary" on:click={start}>Start</Button>
  {/if}
  <div class="flex flex-col items-center gap-1">
    <label for="discCount">Discs</label>
    <select name="discCount" id="discCount" class="min-w-[100px] text-secondary" bind:value={discCount}>
      {#each range(1, TowerOfHanoiGame.maxDiscCount) as count (count)}
        <option value={count}>{count}</option>
      {/each}
    </select>
  </div>
</div>

<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
