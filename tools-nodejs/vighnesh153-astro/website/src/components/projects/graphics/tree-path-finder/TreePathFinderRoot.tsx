import { createSignal, onMount } from "solid-js";

import { sleep } from "@vighnesh153/tools";
import {
  type CanvasWrapper,
  CanvasWrapperImpl,
  TreePathFinderGame,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/index.ts";

export function TreePathFinderRoot() {
  let canvasElement!: HTMLCanvasElement;

  const [canvasWrapper, setCanvasWrapper] = createSignal<CanvasWrapper>();
  const [game, setGame] = createSignal<TreePathFinderGame>();

  const frameDelay = 100;

  const newGame = () => {
    game()?.stop();

    if (canvasWrapper()) {
      const gameInstance = new TreePathFinderGame(canvasWrapper()!);
      const frames = gameInstance.start();
      async function showNextFrame() {
        await sleep(frameDelay);
        if (!frames.next().done) {
          requestAnimationFrame(showNextFrame);
        }
      }
      showNextFrame();
      setGame(gameInstance);
    }
  };

  onMount(() => {
    setCanvasWrapper(new CanvasWrapperImpl(canvasElement));
    newGame();
  });

  return (
    <>
      <div class="flex justify-center items-center gap-10">
        <Button variant="primary" onClick={newGame}>New Game</Button>
      </div>
      <canvas
        class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-[#282727]"
        ref={canvasElement}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
