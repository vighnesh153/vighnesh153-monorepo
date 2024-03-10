<script lang="ts">
  import { onMount } from 'svelte';

  import { FlappyBlockGame, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';
  import type { CanvasWrapper } from '@vighnesh153/graphics-programming';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: FlappyBlockGame;

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === ' ') {
      game.handleSpacebarPress();
    }
    if (e.key === 'Enter') {
      game.handleEnterPress();
    }
  }

  function newGame() {
    if (canvasWrapper) {
      game = new FlappyBlockGame(canvasWrapper);
      canvasElement.focus();
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
  tabindex="0"
  bind:this={canvasElement}
  on:keypress={handleKeyPress}
>
  Sorry your browser doesn't support the canvas element
</canvas>
