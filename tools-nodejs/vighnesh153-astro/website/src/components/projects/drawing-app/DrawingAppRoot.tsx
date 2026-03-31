import { type JSX, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";

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

import { classes } from "@/utils/classes.ts";
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

export function DrawingAppRoot(): JSX.Element {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const [mouseHandlerStore, setMouseHandlerStore] = useState(
    buildMouseHandlerStore(),
  );
  const brushThickness = useStore(brushThicknessStore);
  const color = useStore(colorStore);
  const drawingEventMode = useStore(drawingEventModeStore);
  const [isRedoAvailable, setIsRedoAvailable] = useState(false);
  const [isUndoAvailable, setIsUndoAvailable] = useState(false);
  const [eventsManager, setEventsManager] = useState<EventsManager | null>(
    null,
  );

  const updateMouseHandlerStore = (store: MouseHandlerStore) => {
    setMouseHandlerStore({ ...store });
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
    const localEventsManager = eventsManager!;
    undo(localEventsManager);
  };

  const onRedoButtonClick = (): void => {
    const localEventsManager = eventsManager!;
    redo(localEventsManager);
  };

  const onClearButtonClick = (): void => {
    const localEventsManager = eventsManager!;
    publishEvents(localEventsManager, [
      buildClearScreenEvent({
        color: Color.White,
      }),
      buildCommitEvent(),
    ]);
  };

  const buildAppConfig = (): AppConfig => {
    const c = color;
    const colorCloned = { ...c, rgba: { ...c.rgba } };
    return drawingEventMode === "draw"
      ? { mode: "draw", brushThickness: brushThickness, color: colorCloned }
      : { mode: "fill", color: colorCloned };
  };

  const onMouseDown = (e: React.MouseEvent): void => {
    const store = mouseHandlerStore;
    handleMouseDown(store, e.nativeEvent, canvasElement.current!);
    updateMouseHandlerStore(store);
  };

  const onMouseUp = (e: React.MouseEvent): void => {
    const store = mouseHandlerStore;
    handleMouseUp(
      store,
      eventsManager!,
      buildAppConfig(),
      e.nativeEvent,
      canvasElement.current!,
    );
    updateMouseHandlerStore(store);
  };

  const onMouseMove = (e: React.MouseEvent): void => {
    const store = mouseHandlerStore;
    handleMouseMove(
      store,
      eventsManager!,
      buildAppConfig(),
      e.nativeEvent,
      canvasElement.current!,
    );
    updateMouseHandlerStore(store);
  };

  useEffect(() => {
    if (!canvasElement.current) return;
    const cw = new CanvasWrapperImpl(canvasElement.current, {
      width: canvasElement.current.clientWidth,
      height: canvasElement.current.clientHeight,
    });
    setEventsManager(buildEventsManager(cw));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRedoAvailable(eventsManager?.redoEventsStack.size !== null);
      setIsUndoAvailable(eventsManager?.undoEventsStack.size !== null);
    }, 16);
    return () => {
      clearInterval(interval);
    };
  }, [eventsManager]);

  return (
    <div>
      <Toolbar
        colors={colors}
        brushThicknessList={brushThicknessValues}
        selectedColor={color}
        selectedEventMode={drawingEventMode}
        selectedBrushThickness={brushThickness}
        isRedoAvailable={isRedoAvailable}
        isUndoAvailable={isUndoAvailable}
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
        className={classes(
          "mt-4 mx-auto bg-[white]",
          "w-full max-w-3xl aspect-video",
        )}
        onMouseDown={(e) => onMouseDown(e)}
        onMouseUp={(e) => onMouseUp(e)}
        onMouseMove={(e) => onMouseMove(e)}
      >
        <p>Sorry, canvas element is not supported in your browser</p>
      </canvas>
    </div>
  );
}
