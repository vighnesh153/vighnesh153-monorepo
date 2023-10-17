<script lang="ts">
  import { onMount } from 'svelte';

  import { TowerOfHanoiGame, TowerOfHanoiGameManager, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';

  import Button from '@/components/Button.svelte';

  let canvasElement: HTMLCanvasElement;
  let game: TowerOfHanoiGame;
  let gameManager: TowerOfHanoiGameManager;

  function start() {
    const frames = gameManager.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
  }

  function stop() {
    gameManager.stop();
  }

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    game = new TowerOfHanoiGame(canvasWrapper);
    gameManager = new TowerOfHanoiGameManager(game);
    
    start();
  });
</script>

<div class="flex justify-center gap-2">
  <Button variant="primary" on:click={stop}>Stop rendering</Button>
</div>

<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
