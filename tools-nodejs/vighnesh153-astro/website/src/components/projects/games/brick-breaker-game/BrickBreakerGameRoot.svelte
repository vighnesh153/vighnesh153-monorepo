<script lang="ts">
  import { onMount } from "svelte";

  import {
    BrickBreakerGame,
    CanvasWrapperImpl,
    type CanvasWrapper,
  } from "@vighnesh153/tools-browser/graphics_programming";

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: BrickBreakerGame;

  function handleMouseMove(e: MouseEvent) {
    game.handleMouseMove(e, document.documentElement.scrollLeft);
  }

  function newGame() {
    if (canvasWrapper) {
      game = new BrickBreakerGame(canvasWrapper, {
        onGameOver() {
          game.stop();
          alert("Game over! You win!");
          window.location.reload();
        },
      });
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
