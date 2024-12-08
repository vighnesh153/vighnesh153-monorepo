import { createEffect, createSignal, onMount } from "solid-js";
import {
  CanvasWrapperImpl,
  SymmetricBinaryTreeGame,
} from "@vighnesh153/tools-browser/graphics_programming";

<script lang="ts">
</script>;

export function SymmetricBinaryTreeRoot() {
  let canvasElement!: HTMLCanvasElement;

  const [game, setGame] = createSignal<SymmetricBinaryTreeGame>();

  const initialAngle = 49.66;
  const initialChaos = false;
  const [angle, setAngle] = createSignal<number>(initialAngle);
  const [chaos, setChaos] = createSignal<boolean>(initialChaos);

  onMount(() => {
    const canvasWrapper = new CanvasWrapperImpl(canvasElement);
    const gameInstance = new SymmetricBinaryTreeGame(canvasWrapper, {});
    setAngle(initialAngle);
    setChaos(initialChaos);

    setGame(gameInstance);
  });

  createEffect(() => {
    game()?.update(angle(), chaos());
  });

  return (
    <>
      <div class="flex justify-center items-center gap-20">
        <div class="flex flex-col items-center gap-1">
          <label for="chaos">Chaos?</label>
          <input
            type="checkbox"
            checked={chaos()}
            onChange={(e) => setChaos(e.target.checked)}
            id="chaos"
          />
        </div>
        <div class="flex flex-col items-center gap-1">
          <label for="angle">Seed angle</label>
          <input
            type="range"
            min="47"
            max="56.55"
            value={angle()}
            onChange={(e) => setAngle(+e.target.value)}
            onInput={(e) => setAngle(+e.target.value)}
            id="angle"
            step="0.01"
          />
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
