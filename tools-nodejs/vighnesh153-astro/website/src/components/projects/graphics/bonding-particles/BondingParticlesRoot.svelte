<script lang="ts">
  import { onMount } from "svelte";

  import {
    BondingParticlesGame,
    CanvasWrapperImpl,
  } from "@vighnesh153/tools-browser/graphics_programming";

  let canvasElement: HTMLCanvasElement;
  let game: BondingParticlesGame;

  function onMouseMove(
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLCanvasElement;
    },
  ) {
    const rect = canvasElement.getBoundingClientRect();
    const root = document.documentElement;

    const mouseX = e.clientX - rect.left - root.scrollLeft;
    const mouseY = e.clientY - rect.top - root.scrollTop;

    game.updateMousePosition({ x: mouseX, y: mouseY });
  }

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

<p class="-mt-6 italic text-center text-text2">
  (Use your mouse to move particles)
</p>
<canvas
  class="mt-4 mx-auto w-full max-w-3xl aspect-video bg-text"
  bind:this={canvasElement}
  on:mousemove={onMouseMove}
>
  Sorry your browser doesn't support the canvas element
</canvas>
