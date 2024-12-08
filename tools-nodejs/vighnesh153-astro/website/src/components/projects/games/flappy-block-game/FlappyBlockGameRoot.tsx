import { createSignal, onMount } from "solid-js";
import {
  CanvasWrapperImpl,
  FlappyBlockGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function FlappyBlockGameRoot() {
  let canvasElement!: HTMLCanvasElement;
  const [game, setGame] = createSignal<FlappyBlockGame>();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === " ") {
      game()?.handleSpacebarPress();
    }
    if (e.key === "Enter") {
      game()?.handleEnterPress();
    }
  };

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const gameInstance = new FlappyBlockGame(canvasWrapper);
    canvasElement.focus();
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
      tabindex="0"
      ref={canvasElement}
      onKeyPress={handleKeyPress}
    >
      Sorry your browser doesn't support the canvas element
    </canvas>
  );
}
