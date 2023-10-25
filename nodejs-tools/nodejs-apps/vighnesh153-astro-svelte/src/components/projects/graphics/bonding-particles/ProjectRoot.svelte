<script lang="ts">
  import { onMount } from 'svelte';

  import { BondingParticlesGame, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';

  let canvasElement: HTMLCanvasElement;
  let game: BondingParticlesGame;

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    game = new BondingParticlesGame(canvasWrapper);

    const frames = game.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
  });
</script>

<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
