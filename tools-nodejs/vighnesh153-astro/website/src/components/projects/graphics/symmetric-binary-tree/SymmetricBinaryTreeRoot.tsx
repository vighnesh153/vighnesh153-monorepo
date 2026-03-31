import { type JSX, useEffect, useRef, useState } from "react";
import {
  CanvasWrapperImpl,
  SymmetricBinaryTreeGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function SymmetricBinaryTreeRoot(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [game, setGame] = useState<SymmetricBinaryTreeGame>();

  const initialAngle = 49.66;
  const initialChaos = false;
  const [angle, setAngle] = useState<number>(initialAngle);
  const [chaos, setChaos] = useState<boolean>(initialChaos);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const gameInstance = new SymmetricBinaryTreeGame(canvasWrapper, {});
    setGame(gameInstance);
  }, []);

  useEffect(() => {
    game?.update(angle, chaos);
  }, [game, angle, chaos]);

  return (
    <>
      <div className="flex justify-center items-center gap-20">
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="chaos">Chaos?</label>
          <input
            type="checkbox"
            checked={chaos}
            onChange={(e) => setChaos(e.target.checked)}
            id="chaos"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="angle">Seed angle</label>
          <input
            type="range"
            min="47"
            max="56.55"
            value={angle}
            onChange={(e) => setAngle(+e.target.value)}
            onInput={(e) =>
              setAngle(+(e.target as unknown as ({ value: number })).value)}
            id="angle"
            step="0.01"
          />
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
