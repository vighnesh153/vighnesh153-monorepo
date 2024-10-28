<script lang="ts">
  import { onMount } from "svelte";

  import {
    SortingVisualizerGame,
    CanvasWrapperImpl,
    sortingAlgorithms,
    SortingAlgorithm,
    type CanvasWrapper,
  } from "@vighnesh153/tools-browser/graphics_programming";

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: SortingVisualizerGame;

  let algorithmTitle = sortingAlgorithms[1].displayName;

  function getAlgorithmImpl(): SortingAlgorithm {
    return sortingAlgorithms
      .find((algorithm) => algorithm.displayName === algorithmTitle)!!
      .algorithmFactory();
  }

  function newGame() {
    if (game) {
      game.stop();
    }
    if (canvasWrapper) {
      game = new SortingVisualizerGame(canvasWrapper);
      const frames = game.start(getAlgorithmImpl());
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
    console.log(`Algorithm changed: ${algorithmTitle}`);
    newGame();
  }
</script>

<div class="flex justify-center items-center gap-10">
  <div class="flex flex-col items-center gap-1">
    <label for="algorithm">Algorithm</label>
    <select
      name="algorithm"
      id="algorithm"
      class="min-w-[100px] text-secondary"
      bind:value={algorithmTitle}
    >
      {#each sortingAlgorithms as algorithm (algorithm)}
        <option value={algorithm.displayName}>{algorithm.displayName}</option>
      {/each}
    </select>
  </div>
</div>
<canvas
  class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
  bind:this={canvasElement}
>
  Sorry your browser doesn't support the canvas element
</canvas>
