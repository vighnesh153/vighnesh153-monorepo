<script lang="ts">
  import { onMount } from "svelte";

  import {
    BarnsleysFern,
    CanvasWrapperImpl,
    type CanvasWrapper,
  } from "@vighnesh153/tools-browser/graphics_programming";

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: BarnsleysFern;

  function newGame() {
    if (canvasWrapper) {
      game = new BarnsleysFern(canvasWrapper);
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
>
  Sorry your browser doesn't support the canvas element
</canvas>
