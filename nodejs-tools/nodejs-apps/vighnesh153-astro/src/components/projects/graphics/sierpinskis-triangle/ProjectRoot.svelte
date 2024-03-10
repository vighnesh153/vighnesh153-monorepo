<script lang="ts">
  import { onMount } from 'svelte';

  import {
    SierpinskisTriangleGame,
    SierpinskisTriangleGameManager,
    CanvasWrapperImpl,
  } from '@vighnesh153/graphics-programming';

  import Button from '@/components/Button.svelte';

  let canvasElement: HTMLCanvasElement;
  let game: SierpinskisTriangleGame;
  let gameManager: SierpinskisTriangleGameManager;

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
    game = new SierpinskisTriangleGame(canvasWrapper, { pointRadius: 1, speed: 6 });
    gameManager = new SierpinskisTriangleGameManager(game);

    start();
  });
</script>

<div class="flex justify-center gap-2">
  <Button variant="primary" on:click={stop}>Stop rendering</Button>
</div>

<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
