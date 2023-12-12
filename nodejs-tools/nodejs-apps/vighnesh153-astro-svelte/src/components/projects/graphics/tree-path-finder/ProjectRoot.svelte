<script lang="ts">
  import { onMount } from 'svelte';

  import { TreePathFinderGame, CanvasWrapperImpl, type CanvasWrapper } from '@vighnesh153/graphics-programming';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: TreePathFinderGame;

  function newGame() {
    if (game) {
      game.stop();
    }
    if (canvasWrapper) {
      game = new TreePathFinderGame(canvasWrapper);
      const frames = game.start();
      function showNextFrame() {
        if (!frames.next().done) {
          requestAnimationFrame(showNextFrame);
        }
      }
      showNextFrame();
    }
  }

  onMount(() => {
    canvasWrapper = new CanvasWrapperImpl(canvasElement);
    newGame();
  });
</script>

<div class="flex justify-center items-center gap-10"></div>
<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
