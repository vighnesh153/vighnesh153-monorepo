import { onMount } from "solid-js";

import {
  CanvasWrapperImpl,
  TwinklingStarsGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function TwinklingStarsRoot() {
  let canvasElement!: HTMLCanvasElement;

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const game = new TwinklingStarsGame(canvasWrapper);
    const frames = game.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
  });

  return (
    <>
      <canvas
        class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
        ref={canvasElement}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
