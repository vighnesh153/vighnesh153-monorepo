<script lang="ts">
  import { onMount } from "svelte";

  import { range } from "@vighnesh153/tools";

  import {
    PseudoHilbertCurveGame,
    CanvasWrapperImpl,
    type CanvasWrapper,
  } from "@vighnesh153/tools-browser/graphics_programming";

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let game: PseudoHilbertCurveGame;

  let level = 4;
  let minLevel = 2;
  let maxLevel = 6;

  function newGame() {
    if (game) {
      game.stop();
      game.clear();
    }

    if (canvasWrapper) {
      game = new PseudoHilbertCurveGame(canvasWrapper);
      const frames = game.start(level);
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
    // this log is needed so that this block runs when level changes
    console.log(`Level changed: ${level}`);
    newGame();
  }
</script>

<div class="flex flex-col items-center gap-1">
  <label for="level">Level</label>
  <select
    name="level"
    id="level"
    class="min-w-[100px] text-secondary"
    bind:value={level}
  >
    {#each range(minLevel, maxLevel) as rangeLevel (rangeLevel)}
      <option value={rangeLevel}>{rangeLevel}</option>
    {/each}
  </select>
</div>
<canvas
  class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
  bind:this={canvasElement}
>
  Sorry your browser doesn't support the canvas element
</canvas>
