import { createSignal, onMount } from "solid-js";
import {
  CanvasWrapperImpl,
  SnakeGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function SnakeGameRoot() {
  let canvasElement!: HTMLCanvasElement;
  const [game, setGame] = createSignal<SnakeGame>();

  const keyupEventListener = (e: KeyboardEvent) => {
    e.preventDefault();
    if (["ArrowDown", "s", "S"].includes(e.key)) {
      game()?.changeDirection("bottom");
    } else if (["ArrowUp", "w", "W"].includes(e.key)) {
      game()?.changeDirection("top");
    } else if (["ArrowLeft", "a", "A"].includes(e.key)) {
      game()?.changeDirection("left");
    } else if (["ArrowRight", "d", "D"].includes(e.key)) {
      game()?.changeDirection("right");
    }
  };

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const gameInstance = new SnakeGame(canvasWrapper);
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
      ref={canvasElement}
      onKeyUp={keyupEventListener}
      tabindex="0"
    >
      Sorry your browser doesn't support the canvas element
    </canvas>
  );
}
