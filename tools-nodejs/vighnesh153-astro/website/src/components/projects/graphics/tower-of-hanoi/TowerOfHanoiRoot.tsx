import { useEffect, useRef, useState } from "react";

import { not, range } from "@vighnesh153/tools";
import {
  CanvasWrapperImpl,
  TowerOfHanoiGame,
  TowerOfHanoiGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/index.ts";

export function TowerOfHanoiRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initialDiscCount = 5;

  const [game, setGame] = useState<TowerOfHanoiGame>();
  const [gameManager, setGameManager] = useState<TowerOfHanoiGameManager>();
  const [isRunning, setIsRunning] = useState(false);

  const [discCount, setDiscCount] = useState<number>(initialDiscCount);

  const start = () => {
    const frames = gameManager?.start();
    if (!frames) {
      return;
    }
    const showNextFrame = () => {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
      setIsRunning(!!game?.isRunning);
    };
    showNextFrame();
  };

  const initializeNewGame = (currentDiscCount: number) => {
    if (not(canvasRef.current)) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current!!);
    const gameInstance = new TowerOfHanoiGame(canvasWrapper, {
      discCount: currentDiscCount,
    });
    const gameManagerInstance = new TowerOfHanoiGameManager(gameInstance);

    setGame(gameInstance);
    setGameManager(gameManagerInstance);
    setIsRunning(!!gameInstance.isRunning);
  };

  useEffect(() => {
    initializeNewGame(discCount);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-20">
        {not(isRunning) && (
          <Button variant="primary" onClick={start}>Start</Button>
        )}
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="discCount">Discs</label>
          <select
            name="discCount"
            id="discCount"
            className="min-w-[100px] bg-text2 text-secondary rounded px-2 py-1"
            value={discCount}
            onChange={(e) => {
              const newDiscCount = +e.target.value;
              setDiscCount(newDiscCount);
              gameManager?.stop();
              initializeNewGame(newDiscCount);
            }}
          >
            {Array.from(range(1, TowerOfHanoiGame.maxDiscCount)).map((
              count,
            ) => <option key={count} value={count}>{count}</option>)}
          </select>
        </div>
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
