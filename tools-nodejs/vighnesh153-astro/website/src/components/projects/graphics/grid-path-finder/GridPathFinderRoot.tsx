import { createSignal, For, onMount, Show } from "solid-js";
import { range, sleep } from "@vighnesh153/tools";

import {
  getCellColor,
  GridPathFinderGame,
  GridPathFinderGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/solid/buttons/Button.tsx";

const cellSize = 15;

export function GridPathFinderRoot() {
  let container!: HTMLDivElement;

  const [rows, setRows] = createSignal(0);
  const [cols, setCols] = createSignal(0);
  const [mounted, setMounted] = createSignal(false);
  const [game, setGame] = createSignal<GridPathFinderGame>();
  const [gameManager, setGameManager] = createSignal<
    GridPathFinderGameManager
  >();

  const createNewGame = () => {
    return GridPathFinderGame.createNewWithDefaults(rows(), cols());
  };

  onMount(() => {
    const rect = container.getBoundingClientRect();
    setCols(
      Math.floor((window.innerWidth - rect.left - rect.right) / cellSize - 1),
    );
    setRows(Math.floor((window.innerHeight - rect.top) / cellSize - 10));
    setGame(createNewGame());
    setGameManager(new GridPathFinderGameManager(game()!));
    setMounted(true);
  });

  const solve = () => {
    const frames = gameManager()?.solve();
    if (!frames) {
      return;
    }

    const showNextFrame = () => {
      const nextFrame = frames.next();
      setGame(game);

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
    setGame(createNewGame());
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
                        getCellColor(game()!, row, col)
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
