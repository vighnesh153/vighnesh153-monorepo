import { createSignal, For, onMount } from "solid-js";
import {
  type CanvasWrapper,
  CanvasWrapperImpl,
  type SortingAlgorithm,
  sortingAlgorithms,
  SortingVisualizerGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function SortingVisualizerRoot() {
  let canvasElement!: HTMLCanvasElement;

  const [canvasWrapper, setCanvasWrapper] = createSignal<CanvasWrapper>();
  const [game, setGame] = createSignal<SortingVisualizerGame>();

  const initialAlgorithmTitle = sortingAlgorithms[1].displayName;
  const [algorithmTitle, setAlgorithmTitle] = createSignal<string>();

  const getAlgorithmImpl = (): SortingAlgorithm => {
    return sortingAlgorithms
      .find((algorithm) => algorithm.displayName === algorithmTitle())!!
      .algorithmFactory();
  };

  const newGame = () => {
    game()?.stop();

    if (canvasWrapper()) {
      const gameInstance = new SortingVisualizerGame(canvasWrapper()!);
      const frames = gameInstance.start(getAlgorithmImpl());
      function showNextFrame() {
        if (!frames.next().done) {
          requestAnimationFrame(showNextFrame);
        }
      }
      showNextFrame();
      setGame(gameInstance);
    }
  };

  onMount(() => {
    setAlgorithmTitle(initialAlgorithmTitle);
    setCanvasWrapper(new CanvasWrapperImpl(canvasElement));
    newGame();
  });

  return (
    <>
      <div class="flex justify-center items-center gap-10">
        <div class="flex flex-col items-center gap-1">
          <label for="algorithm">Algorithm</label>
          <select
            name="algorithm"
            id="algorithm"
            class="min-w-[100px] bg-text2 text-secondary rounded px-2 py-1"
            value={algorithmTitle()}
            onChange={(e) => {
              setAlgorithmTitle(e.target.value);
              newGame();
              console.log(`Algorithm changed: ${algorithmTitle()}`);
            }}
          >
            <For each={sortingAlgorithms}>
              {(algorithm) => (
                <option value={algorithm.displayName}>
                  {algorithm.displayName}
                </option>
              )}
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
