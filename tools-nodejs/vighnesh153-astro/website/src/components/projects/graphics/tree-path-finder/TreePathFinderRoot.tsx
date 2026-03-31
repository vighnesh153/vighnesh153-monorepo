import { useEffect, useRef, useState } from "react";

import { sleep } from "@vighnesh153/tools";
import {
  type CanvasWrapper,
  CanvasWrapperImpl,
  TreePathFinderGame,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/index.ts";

export function TreePathFinderRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasWrapper, setCanvasWrapper] = useState<CanvasWrapper>();
  const [game, setGame] = useState<TreePathFinderGame>();

  const frameDelay = 100;

  const newGame = (cw?: CanvasWrapper) => {
    game?.stop();

    const wrapper = cw ?? canvasWrapper;
    if (wrapper) {
      const gameInstance = new TreePathFinderGame(wrapper);
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

  useEffect(() => {
    if (!canvasRef.current) return;
    const cw = new CanvasWrapperImpl(canvasRef.current);
    setCanvasWrapper(cw);
    newGame(cw);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <Button variant="primary" onClick={() => newGame()}>New Game</Button>
      </div>
      <canvas
        className="mt-6 mx-auto w-full max-w-3xl aspect-video bg-[#282727]"
        ref={canvasRef}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
