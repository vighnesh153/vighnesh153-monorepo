import { useEffect, useRef, useState } from "react";

import {
  CanvasWrapperImpl,
  SierpinskisTriangleGame,
  SierpinskisTriangleGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/index.ts";
import { createSnackbar } from "@/store/snackbar.ts";

export function SierpinskisTriangleRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameManager, setGameManager] = useState<
    SierpinskisTriangleGameManager
  >();

  const start = (gm: SierpinskisTriangleGameManager) => {
    const frames = gm.start();
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
    gameManager?.stop();
    createSnackbar({
      type: "warn",
      message: "Rendering stopped. Refresh page to restart...",
      autoDismissible: false,
      manualDismissible: true,
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const game = new SierpinskisTriangleGame(canvasWrapper, {
      pointRadius: 1,
      speed: 6,
    });
    const gm = new SierpinskisTriangleGameManager(game);
    setGameManager(gm);
    start(gm);
  }, []);

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button variant="primary" onClick={stop}>Stop rendering</Button>
      </div>

      <canvas
        className="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
        ref={canvasRef}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
