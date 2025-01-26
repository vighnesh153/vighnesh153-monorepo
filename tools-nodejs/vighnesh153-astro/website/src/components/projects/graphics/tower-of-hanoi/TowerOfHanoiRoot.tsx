import { createSignal, For, onMount, Show } from "solid-js";

import { not, range } from "@vighnesh153/tools";
import {
  CanvasWrapperImpl,
  TowerOfHanoiGame,
  TowerOfHanoiGameManager,
} from "@vighnesh153/tools-browser/graphics_programming";

import { Button } from "@/components/buttons/index.ts";

export function TowerOfHanoiRoot() {
  let canvasElement!: HTMLCanvasElement;

  const initialDiscCount = 5;

  const [game, setGame] = createSignal<TowerOfHanoiGame>();
  const [gameManager, setGameManager] = createSignal<TowerOfHanoiGameManager>();
  const [isRunning, setIsRunning] = createSignal(false);

  const [discCount, setDiscCount] = createSignal<number>();

  const start = () => {
    const frames = gameManager()?.start();
    if (!frames) {
      return;
    }
    const showNextFrame = () => {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
      setIsRunning(!!game()?.isRunning);
    };
    showNextFrame();
  };

  const initializeNewGame = () => {
    if (not(canvasElement)) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const gameInstance = new TowerOfHanoiGame(canvasWrapper, {
      discCount: discCount(),
    });
    const gameManagerInstance = new TowerOfHanoiGameManager(gameInstance);

    setGame(gameInstance);
    setGameManager(gameManagerInstance);
    setIsRunning(!!game()?.isRunning);
  };

  onMount(() => {
    setDiscCount(initialDiscCount);
    initializeNewGame();
  });

  return (
    <>
      <div class="flex justify-center items-center gap-20">
        <Show when={not(isRunning())}>
          <Button variant="primary" onClick={start}>Start</Button>
        </Show>
        <div class="flex flex-col items-center gap-1">
          <label for="discCount">Discs</label>
          <select
            name="discCount"
            id="discCount"
            class="min-w-[100px] bg-text2 text-secondary rounded px-2 py-1"
            value={discCount()}
            onChange={(e) => {
              setDiscCount(+e.target.value);
              gameManager()?.stop();
              initializeNewGame();
              console.log(`Disc count changed: ${discCount()}`);
            }}
          >
            <For each={Array.from(range(1, TowerOfHanoiGame.maxDiscCount))}>
              {(count) => <option value={count}>{count}</option>}
            </For>
          </select>
        </div>
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
