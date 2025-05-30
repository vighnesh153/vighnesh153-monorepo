import { createSignal, onMount } from "solid-js";
import {
  CanvasWrapperImpl,
  PongGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function PongGameRoot() {
  let canvasElement!: HTMLCanvasElement;
  const [game, setGame] = createSignal<PongGame>();

  const handleMouseMove = (e: MouseEvent) => {
    game()?.handleMouseMove(e, document.documentElement.scrollTop);
  };

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const gameInstance = new PongGame(canvasWrapper);
    const frames = gameInstance.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
    setGame(gameInstance);
  });

  return (
    <canvas
      class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
      ref={canvasElement}
      onMouseMove={handleMouseMove}
    >
      Sorry your browser doesn't support the canvas element
    </canvas>
  );
}
