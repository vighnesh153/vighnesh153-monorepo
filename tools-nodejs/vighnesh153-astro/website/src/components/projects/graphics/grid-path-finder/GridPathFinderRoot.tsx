import { createSignal, For, onMount, Show } from "solid-js";
import { range, sleep } from "@vighnesh153/tools";

import {
  getCellColor,
  GridPathFinderGame,
  GridPathFinderGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/Button.tsx";

export function GridPathFinderRoot() {
  const cellSize = 15;
  let container!: HTMLDivElement;

  const [rows, setRows] = createSignal(0);
  const [cols, setCols] = createSignal(0);
  const [mounted, setMounted] = createSignal(false);
  const [game, setGame] = createSignal<GridPathFinderGame>();
  const [gameManager, setGameManager] = createSignal<
    GridPathFinderGameManager
  >();
  const [cellColors, setCellColors] = createSignal<
    Map<number, Map<number, string>>
  >(new Map());

  const createNewGame = () => {
    const gameInstance = GridPathFinderGame.createNewWithDefaults(
      rows(),
      cols(),
    );
    setGame(gameInstance);
    syncCellColors();
  };

  onMount(() => {
    const rect = container.getBoundingClientRect();
    setCols(
      Math.floor((window.innerWidth - rect.left - rect.right) / cellSize - 1),
    );
    setRows(Math.floor((window.innerHeight - rect.top) / cellSize - 10));
    createNewGame();
    setGameManager(new GridPathFinderGameManager(game()!));
    setMounted(true);
    syncCellColors();
  });

  const syncCellColors = () => {
    const rowCount = rows();
    const colCount = cols();
    const gameState = game();

    if (!gameState) {
      return;
    }

    const newCellColors: Map<number, Map<number, string>> = new Map();
    for (let row = 0; row < rowCount; row++) {
      newCellColors.set(row, new Map());
      for (let col = 0; col < colCount; col++) {
        newCellColors.get(row)?.set(col, getCellColor(gameState, row, col));
      }
    }

    setCellColors(newCellColors);
  };

  const solve = () => {
    const frames = gameManager()?.solve();
    if (!frames) {
      return;
    }

    const showNextFrame = () => {
      const nextFrame = frames.next();
      syncCellColors();

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
    createNewGame();
    gameManager()?.randomize(game()!);
  };

  return (
    <>
      <div class="flex justify-center gap-2">
        <Button variant="primary" onClick={solve}>Solve</Button>
        <Button onClick={randomize}>Randomize</Button>
      </div>

      <div
        class="mt-6 border box-border border-text"
        ref={container}
        style={`width: ${cellSize * cols() + 2}px`}
      >
        <Show when={mounted() && cols() > 0}>
          <For each={Array.from(range(0, rows() - 1))}>
            {(row) => (
              <div class="w-fit flex justify-center">
                <For each={Array.from(range(0, cols() - 1))}>
                  {(col) => (
                    <div
                      class="border border-secondary shrink-0 box-border"
                      style={`width: ${cellSize}px; height: ${cellSize}px; background: ${
                        cellColors()
                          .get(row)?.get(col) ?? "white"
                      }`}
                    />
                  )}
                </For>
              </div>
            )}
          </For>
        </Show>
      </div>
    </>
  );
}
