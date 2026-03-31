import { useEffect, useRef, useState } from "react";

import { range } from "@vighnesh153/tools";

import {
  type CanvasWrapper,
  CanvasWrapperImpl,
  PseudoHilbertCurveGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function PseudoHilbertCurveRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [game, setGame] = useState<PseudoHilbertCurveGame>();
  const [canvasWrapper, setCanvasWrapper] = useState<CanvasWrapper>();

  let minLevel = 2;
  let maxLevel = 6;
  let initialValue = 4;
  const [level, setLevel] = useState<number>(initialValue);

  const newGame = () => {
    game?.stop();
    game?.clear();

    if (canvasWrapper) {
      const gameInstance = new PseudoHilbertCurveGame(canvasWrapper!);
      const frames = gameInstance.start(level!);
      function showNextFrame() {
        if (!frames.next().done) {
          requestAnimationFrame(showNextFrame);
        }
      }
      showNextFrame();

      setGame(gameInstance);
    }
  };

  const updateLevel: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setLevel(+e.target.value);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const cw = new CanvasWrapperImpl(canvasRef.current);
    setCanvasWrapper(cw);

    const gameInstance = new PseudoHilbertCurveGame(cw);
    const frames = gameInstance.start(level!);
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();

    setGame(gameInstance);
  }, []);

  useEffect(() => {
    newGame();
  }, [level]);

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <label htmlFor="level">Level</label>
        <select
          name="level"
          id="level"
          className="min-w-[100px] bg-text2 text-secondary rounded px-2 py-1"
          value={level}
          onChange={updateLevel}
        >
          {Array.from(range(minLevel, maxLevel)).map((rangeLevel) => (
            <option key={rangeLevel} value={rangeLevel}>{rangeLevel}</option>
          ))}
        </select>
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
