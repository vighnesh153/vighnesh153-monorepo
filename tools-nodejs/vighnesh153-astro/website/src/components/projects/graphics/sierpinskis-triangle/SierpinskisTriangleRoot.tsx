import { createSignal, onMount } from "solid-js";

import {
  CanvasWrapperImpl,
  SierpinskisTriangleGame,
  SierpinskisTriangleGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/solid/buttons/index.ts";
import { createSnackbar } from "@/store/snackbar.ts";

export function SierpinskisTriangleRoot() {
  let canvasElement!: HTMLCanvasElement;

  const [gameManager, setGameManager] = createSignal<
    SierpinskisTriangleGameManager
  >();

  const start = () => {
    const frames = gameManager()?.start();
    if (!frames) {
      return;
    }
    const showNextFrame = () => {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    };
    showNextFrame();
  };

  const stop = () => {
    gameManager()?.stop();
    createSnackbar({
      type: "warn",
      message: "Rendering stopped. Refresh page to restart...",
      autoDismissible: false,
      manualDismissible: true,
    });
  };

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const game = new SierpinskisTriangleGame(canvasWrapper, {
      pointRadius: 1,
      speed: 6,
    });
    setGameManager(new SierpinskisTriangleGameManager(game));
    start();
  });

  return (
    <>
      <div class="flex justify-center gap-2">
        <Button variant="primary" onClick={stop}>Stop rendering</Button>
      </div>

      <canvas
        class="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
        ref={canvasElement}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
