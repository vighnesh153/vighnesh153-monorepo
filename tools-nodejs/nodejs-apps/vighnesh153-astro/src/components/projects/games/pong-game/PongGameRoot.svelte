<script lang="ts">
  import { onMount } from 'svelte';

  import { PongGame, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';
  import type { CanvasWrapper } from '@vighnesh153/graphics-programming';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: PongGame;

  function handleMouseMove(e: MouseEvent) {
    game.handleMouseMove(e, document.documentElement.scrollTop);
  }

  function newGame() {
    if (canvasWrapper) {
      game = new PongGame(canvasWrapper);
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

<canvas
  class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
  bind:this={canvasElement}
  on:mousemove={handleMouseMove}
>
  Sorry your browser doesn't support the canvas element
</canvas>
