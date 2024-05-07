<script lang="ts">
  import { onMount } from 'svelte';

  import { SnakeGame, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';
  import type { CanvasWrapper } from '@vighnesh153/graphics-programming';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: SnakeGame;

  function keyupEventListener(e: KeyboardEvent) {
    e.preventDefault();
    if (['ArrowDown', 's', 'S'].includes(e.key)) {
      game.changeDirection('bottom');
    } else if (['ArrowUp', 'w', 'W'].includes(e.key)) {
      game.changeDirection('top');
    } else if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
      game.changeDirection('left');
    } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
      game.changeDirection('right');
    }
  }

  function newGame() {
    if (canvasWrapper) {
      game = new SnakeGame(canvasWrapper);
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
  bind:this={canvasElement}
  on:keyup={keyupEventListener}
  tabindex="0"
>
  Sorry your browser doesn't support the canvas element
</canvas>
