import { useEffect, useRef, useState } from "react";
import {
  type CanvasWrapper,
  CanvasWrapperImpl,
  type SortingAlgorithm,
  sortingAlgorithms,
  SortingVisualizerGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function SortingVisualizerRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasWrapper, setCanvasWrapper] = useState<CanvasWrapper>();
  const [game, setGame] = useState<SortingVisualizerGame>();

  const initialAlgorithmTitle = sortingAlgorithms[1].displayName;
  const [algorithmTitle, setAlgorithmTitle] = useState<string>(initialAlgorithmTitle);

  const getAlgorithmImpl = (title: string): SortingAlgorithm => {
    return sortingAlgorithms
      .find((algorithm) => algorithm.displayName === title)!!
      .algorithmFactory();
  };

  const newGame = (cw: CanvasWrapper, title: string) => {
    game?.stop();

    const gameInstance = new SortingVisualizerGame(cw);
    const frames = gameInstance.start(getAlgorithmImpl(title));
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
    setGame(gameInstance);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const cw = new CanvasWrapperImpl(canvasRef.current);
    setCanvasWrapper(cw);
    newGame(cw, algorithmTitle);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="algorithm">Algorithm</label>
          <select
            name="algorithm"
            id="algorithm"
            className="min-w-[100px] bg-text2 text-secondary rounded px-2 py-1"
            value={algorithmTitle}
            onChange={(e) => {
              const newTitle = e.target.value;
              setAlgorithmTitle(newTitle);
              if (canvasWrapper) {
                newGame(canvasWrapper, newTitle);
              }
            }}
          >
            {sortingAlgorithms.map((algorithm) => (
              <option key={algorithm.displayName} value={algorithm.displayName}>
                {algorithm.displayName}
              </option>
            ))}
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
