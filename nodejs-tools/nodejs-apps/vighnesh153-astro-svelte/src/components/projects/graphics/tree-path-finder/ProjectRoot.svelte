<script lang="ts">
  import { onMount } from 'svelte';

  import { sleep } from '@vighnesh153/utils';
  import { TreePathFinderGame, CanvasWrapperImpl, type CanvasWrapper } from '@vighnesh153/graphics-programming';

  import Button from '@/components/Button.svelte';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: TreePathFinderGame;

  const frameDelay = 100;

  function newGame() {
    if (game) {
      game.stop();
    }
    if (canvasWrapper) {
      game = new TreePathFinderGame(canvasWrapper);
      const frames = game.start();
      async function showNextFrame() {
        await sleep(frameDelay);
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

<div class="flex justify-center items-center gap-10">
  <Button variant="primary" on:click={newGame}>New Game</Button>
</div>
<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-[#282727]" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
