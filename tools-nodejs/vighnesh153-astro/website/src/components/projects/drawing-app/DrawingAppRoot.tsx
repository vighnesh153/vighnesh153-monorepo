import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { useStore } from "@nanostores/solid";

import {
  type AppConfig,
  BrushThickness,
  buildClearScreenEvent,
  buildCommitEvent,
  buildEventsManager,
  buildMouseHandlerStore,
  CanvasWrapperImpl,
  Color,
  type EventMode,
  type EventsManager,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  type IColor,
  type MouseHandlerStore,
  publishEvents,
  redo,
  undo,
} from "@vighnesh153/drawing-app";

import { classes } from "@/utils/index.ts";
import {
  brushThicknessStore,
  colorStore,
  drawingEventModeStore,
} from "@/store/projects/drawing-app/index.ts";

import { Toolbar } from "./Toolbar.tsx";

const colors: IColor[] = Object.values(Color);
const brushThicknessValues = [
  BrushThickness.xs,
  BrushThickness.sm,
  BrushThickness.md,
  BrushThickness.lg,
  BrushThickness.xl,
];

export function DrawingAppRoot() {
  let canvasElement!: HTMLCanvasElement;
  const [mouseHandlerStore, setMouseHandlerStore] = createSignal(
    buildMouseHandlerStore(),
  );
  const brushThickness = useStore(brushThicknessStore);
  const color = useStore(colorStore);
  const drawingEventMode = useStore(drawingEventModeStore);
  const [isRedoAvailable, setIsRedoAvailable] = createSignal(false);
  const [isUndoAvailable, setIsUndoAvailable] = createSignal(false);
  const [eventsManager, setEventsManager] = createSignal<EventsManager | null>(
    null,
  );

  const updateMouseHandlerStore = (store: MouseHandlerStore) => {
    setMouseHandlerStore(store);
  };

  const onModeChange = (newMode: EventMode) => {
    drawingEventModeStore.set(newMode);
  };

  const onColorChange = (newColor: IColor): void => {
    colorStore.set(newColor);
  };

  const onBrushThicknessChange = (newBrushThickness: BrushThickness): void => {
    brushThicknessStore.set(newBrushThickness);
  };

  const onUndoButtonClick = (): void => {
    const localEventsManager = eventsManager()!;
    undo(localEventsManager);
  };

  const onRedoButtonClick = (): void => {
    const localEventsManager = eventsManager()!;
    redo(localEventsManager);
  };

  const onClearButtonClick = (): void => {
    const localEventsManager = eventsManager()!;
    publishEvents(localEventsManager, [
      buildClearScreenEvent({
        color: Color.White,
      }),
      buildCommitEvent(),
    ]);
  };

  const buildAppConfig = (): AppConfig => {
    const c = color();
    const colorCloned = { ...c, rgba: { ...c.rgba } };
    return drawingEventMode() === "draw"
      ? { mode: "draw", brushThickness: brushThickness(), color: colorCloned }
      : { mode: "fill", color: colorCloned };
  };

  const onMouseDown = (e: MouseEvent): void => {
    const store = mouseHandlerStore();
    handleMouseDown(store, e, canvasElement);
    updateMouseHandlerStore(store);
  };

  const onMouseUp = (e: MouseEvent): void => {
    const store = mouseHandlerStore();
    handleMouseUp(
      store,
      eventsManager()!,
      buildAppConfig(),
      e,
      canvasElement,
    );
    updateMouseHandlerStore(store);
  };

  const onMouseMove = (e: MouseEvent): void => {
    const store = mouseHandlerStore();
    handleMouseMove(
      store,
      eventsManager()!,
      buildAppConfig(),
      e,
      canvasElement,
    );
    updateMouseHandlerStore(store);
  };

  onMount(() => {
    const cw = new CanvasWrapperImpl(canvasElement, {
      width: canvasElement.clientWidth,
      height: canvasElement.clientHeight,
    });
    setEventsManager(buildEventsManager(cw));
  });

  createEffect(() => {
    const interval = setInterval(() => {
      setIsRedoAvailable((eventsManager()?.redoEventsStack.size ?? 0) > 0);
      setIsUndoAvailable((eventsManager()?.undoEventsStack.size ?? 0) > 0);
    }, 16);
    onCleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <div>
      <Toolbar
        colors={colors}
        brushThicknessList={brushThicknessValues}
        selectedColor={color()}
        selectedEventMode={drawingEventMode()}
        selectedBrushThickness={brushThickness()}
        isRedoAvailable={isRedoAvailable()}
        isUndoAvailable={isUndoAvailable()}
        onModeChange={(newMode) => onModeChange(newMode)}
        onColorChange={(newColor) => onColorChange(newColor)}
        onBrushThicknessChange={(newBrushThickness) =>
          onBrushThicknessChange(newBrushThickness)}
        onUndoButtonClick={onUndoButtonClick}
        onRedoButtonClick={onRedoButtonClick}
        onClearButtonClick={onClearButtonClick}
      />

      <canvas
        ref={canvasElement}
        class={classes(
          "mt-4 mx-auto bg-[white]",
          "w-full max-w-3xl aspect-video",
        )}
        on:mousedown={(e) => onMouseDown(e)}
        on:mouseup={(e) => onMouseUp(e)}
        on:mousemove={(e) => onMouseMove(e)}
      >
        <p>Sorry, canvas element is not supported in your browser</p>
      </canvas>
    </div>
  );
}
