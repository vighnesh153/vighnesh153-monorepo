<script lang="ts">
  import { onMount } from 'svelte';

  import { SymmetricBinaryTreeGame, CanvasWrapperImpl } from '@vighnesh153/graphics-programming';

  let canvasElement: HTMLCanvasElement;
  let game: SymmetricBinaryTreeGame;

  let angle = 49.66;
  let chaos = false;

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    game = new SymmetricBinaryTreeGame(canvasWrapper, {});
  });

  $: {
    game?.update(angle, chaos);
  }
</script>

<div class="flex justify-center items-center gap-20">
  <div class="flex flex-col items-center gap-1">
    <label for="chaos">Chaos?</label>
    <input type="checkbox" bind:checked={chaos} id="chaos" />
  </div>
  <div class="flex flex-col items-center gap-1">
    <label for="angle">Seed angle</label>
    <input type="range" min="47" max="56.55" bind:value={angle} id="angle" step="0.01" />
  </div>
</div>

<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
