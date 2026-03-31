import { useEffect, useRef, useState } from "react";
import { range, sleep } from "@vighnesh153/tools";

import {
  getCellColor,
  GridPathFinderGame,
  GridPathFinderGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/Button.tsx";

export function GridPathFinderRoot() {
  const cellSize = 15;
  const containerRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [game, setGame] = useState<GridPathFinderGame>();
  const [gameManager, setGameManager] = useState<
    GridPathFinderGameManager
  >();
  const [cellColors, setCellColors] = useState<
    Map<number, Map<number, string>>
  >(new Map());

  const syncCellColors = (gameState: GridPathFinderGame, rowCount: number, colCount: number) => {
    const newCellColors: Map<number, Map<number, string>> = new Map();
    for (let row = 0; row < rowCount; row++) {
      newCellColors.set(row, new Map());
      for (let col = 0; col < colCount; col++) {
        newCellColors.get(row)?.set(col, getCellColor(gameState, row, col));
      }
    }
    setCellColors(newCellColors);
  };

  const createNewGame = (rowCount: number, colCount: number) => {
    const gameInstance = GridPathFinderGame.createNewWithDefaults(
      rowCount,
      colCount,
    );
    setGame(gameInstance);
    syncCellColors(gameInstance, rowCount, colCount);
    return gameInstance;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const calculatedCols = Math.floor((window.innerWidth - rect.left - rect.right) / cellSize - 1);
    const calculatedRows = Math.floor((window.innerHeight - rect.top) / cellSize - 10);
    
    setCols(calculatedCols);
    setRows(calculatedRows);
    
    const gameInstance = createNewGame(calculatedRows, calculatedCols);
    setGameManager(new GridPathFinderGameManager(gameInstance));
    setMounted(true);
  }, []);

  const solve = () => {
    const frames = gameManager?.solve();
    if (!frames) {
      return;
    }

    const showNextFrame = () => {
      const nextFrame = frames.next();
      if (game) {
        syncCellColors(game, rows, cols);
      }

      if (!nextFrame.done) {
        requestAnimationFrame(async () => {
          await sleep(50);
          showNextFrame();
        });
      }
    };

    showNextFrame();
  };

  const randomize = () => {
    const gameInstance = createNewGame(rows, cols);
    gameManager?.randomize(gameInstance);
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button variant="primary" onClick={solve}>Solve</Button>
        <Button onClick={randomize}>Randomize</Button>
      </div>

      <div
        className="mt-6 border box-border border-text"
        ref={containerRef}
        style={{ width: `${cellSize * cols + 2}px` }}
      >
        {mounted && cols > 0 && Array.from(range(0, rows - 1)).map((row) => (
          <div key={row} className="w-fit flex justify-center">
            {Array.from(range(0, cols - 1)).map((col) => (
              <div
                key={col}
                className="border border-secondary shrink-0 box-border"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  background: cellColors.get(row)?.get(col) ?? "white",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
