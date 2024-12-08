import { createSignal, onMount } from "solid-js";
import {
  BondingParticlesGame,
  CanvasWrapperImpl,
} from "@vighnesh153/tools-browser/graphics_programming";

export function BondingParticlesRoot() {
  let canvasElement!: HTMLCanvasElement;

  const [game, setGame] = createSignal<BondingParticlesGame>();

  const onMouseMove = (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLCanvasElement;
    },
  ) => {
    const rect = canvasElement.getBoundingClientRect();
    const root = document.documentElement;

    const mouseX = e.clientX - rect.left - root.scrollLeft;
    const mouseY = e.clientY - rect.top - root.scrollTop;

    game()?.updateMousePosition({ x: mouseX, y: mouseY });
  };

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const gameInstance = new BondingParticlesGame(canvasWrapper);

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
    <>
      <p class="-mt-6 italic text-center text-text2">
        (Use your mouse to dislodge particles)
      </p>
      <canvas
        class="mt-4 mx-auto w-full max-w-3xl aspect-video bg-text"
        ref={canvasElement}
        onMouseMove={onMouseMove}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
