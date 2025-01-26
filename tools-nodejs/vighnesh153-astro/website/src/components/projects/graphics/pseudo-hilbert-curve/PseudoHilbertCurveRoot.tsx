import { createSignal, For, type JSX, onMount } from "solid-js";

import { range } from "@vighnesh153/tools";

import {
  type CanvasWrapper,
  CanvasWrapperImpl,
  PseudoHilbertCurveGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function PseudoHilbertCurveRoot() {
  let canvasElement!: HTMLCanvasElement;

  const [game, setGame] = createSignal<PseudoHilbertCurveGame>();
  const [canvasWrapper, setCanvasWrapper] = createSignal<CanvasWrapper>();

  let minLevel = 2;
  let maxLevel = 6;
  let initialValue = 4;
  const [level, setLevel] = createSignal<number>();

  const newGame = () => {
    game()?.stop();
    game()?.clear();

    if (canvasWrapper()) {
      const gameInstance = new PseudoHilbertCurveGame(canvasWrapper()!);
      const frames = gameInstance.start(level()!);
      function showNextFrame() {
        if (!frames.next().done) {
          requestAnimationFrame(showNextFrame);
        }
      }
      showNextFrame();

      setGame(gameInstance);
    }
  };

  const updateLevel: JSX.ChangeEventHandler<HTMLSelectElement, Event> = (e) => {
    setLevel(+e.target.value);
    newGame();
  };

  onMount(() => {
    setLevel(initialValue);
    setCanvasWrapper(new CanvasWrapperImpl(canvasElement));
    newGame();
  });

  return (
    <>
      <div class="flex flex-col items-center gap-1">
        <label for="level">Level</label>
        <select
          name="level"
          id="level"
          class="min-w-[100px] bg-text2 text-secondary rounded px-2 py-1"
          value={level()}
          onChange={updateLevel}
        >
          <For each={Array.from(range(minLevel, maxLevel))}>
            {(rangeLevel) => <option value={rangeLevel}>{rangeLevel}</option>}
          </For>
        </select>
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
