<script lang="ts">
  import { onMount } from 'svelte';

  import {
    SortingVisualizerGame,
    CanvasWrapperImpl,
    BubbleSortSortingAlgorithm,
    MergeSortSortingAlgorithm,
    SelectionSortSortingAlgorithm,
  } from '@vighnesh153/graphics-programming';
  import type { CanvasWrapper } from '@vighnesh153/graphics-programming';

  import Button from '@/components/Button.svelte';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: SortingVisualizerGame;

  const allAlgorithms = ['Bubble sort', 'Merge sort', 'Selection sort', 'Insertion sort'];
  let algorithm = allAlgorithms[0];

  function newGame() {
    if (canvasWrapper) {
      game = new SortingVisualizerGame(canvasWrapper);
      const frames = game.start(new SelectionSortSortingAlgorithm());
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

  $: {
    // this log is needed so that this block runs when algorithm changes
    console.log(`Algorithm changed: ${algorithm}`);
    newGame();
  }
</script>

<div class="flex justify-center items-center gap-10">
  <Button variant="primary">Start</Button>

  <Button>Randomize Array</Button>

  <div class="flex flex-col items-center gap-1">
    <label for="algorithm">Algorithm</label>
    <select name="algorithm" id="algorithm" class="min-w-[100px] text-secondary" bind:value={algorithm}>
      {#each allAlgorithms as algorithm (algorithm)}
        <option value={algorithm}>{algorithm}</option>
      {/each}
    </select>
  </div>
</div>
<canvas class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text" bind:this={canvasElement}>
  Sorry your browser doesn't support the canvas element
</canvas>
