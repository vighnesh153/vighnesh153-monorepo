<script lang="ts">
  import { onMount } from 'svelte';

  import {
    type EventMode,
    Color,
    type IColor,
    BrushThickness,
    undo,
    redo,
    publishEvents,
    buildClearScreenEvent,
    buildCommitEvent,
    buildMouseHandlerStore,
    type CanvasWrapper,
    CanvasWrapperImpl,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    type AppConfig,
    processAppEvent,
  } from '@vighnesh153/drawing-app';

  import { classes } from '@/utils/index.ts';
  import {
    brushThicknessStore,
    colorStore,
    drawingEventModeStore,
    isRedoAvailableStore,
    isUndoAvailableStore,
    eventsManagerStore,
    pendingQueueStore,
  } from '@/store/projects/drawing-app/index.ts';

  import Toolbar from './Toolbar.svelte';

  let canvasElement: HTMLCanvasElement;
  let canvasWrapper: CanvasWrapper;
  let mouseHandlerStore = buildMouseHandlerStore();

  const colors: IColor[] = Object.values(Color);
  const brushThicknessValues = [
    BrushThickness.xs,
    BrushThickness.sm,
    BrushThickness.md,
    BrushThickness.lg,
    BrushThickness.xl,
  ];

  $: {
    if (canvasWrapper) {
      processAppEvent(canvasWrapper, $pendingQueueStore);
    }
  }

  function onModeChange(newMode: EventMode) {
    $drawingEventModeStore = newMode;
  }

  function onColorChange(newColor: IColor): void {
    $colorStore = newColor;
  }

  function onBrushThicknessChange(newBrushThickness: BrushThickness): void {
    $brushThicknessStore = newBrushThickness;
  }

  function onUndoButtonClick(): void {
    undo($eventsManagerStore);
    $eventsManagerStore = $eventsManagerStore;
  }

  function onRedoButtonClick(): void {
    redo($eventsManagerStore);
    $eventsManagerStore = $eventsManagerStore;
  }

  function onClearButtonClick(): void {
    publishEvents($eventsManagerStore, [
      buildClearScreenEvent({
        color: Color.White,
      }),
      buildCommitEvent(),
    ]);
    $eventsManagerStore = $eventsManagerStore;
  }

  function buildAppConfig(): AppConfig {
    return $drawingEventModeStore === 'draw'
      ? { mode: 'draw', brushThickness: $brushThicknessStore, color: $colorStore }
      : { mode: 'fill', color: $colorStore };
  }

  function onMouseDown(e: MouseEvent): void {
    handleMouseDown(mouseHandlerStore, e, canvasElement);
    $eventsManagerStore = $eventsManagerStore;
    mouseHandlerStore = mouseHandlerStore;
  }

  function onMouseUp(e: MouseEvent): void {
    handleMouseUp(mouseHandlerStore, $eventsManagerStore, buildAppConfig(), e, canvasElement);
    $eventsManagerStore = $eventsManagerStore;
    mouseHandlerStore = mouseHandlerStore;
  }

  function onMouseMove(e: MouseEvent): void {
    handleMouseMove(mouseHandlerStore, $eventsManagerStore, buildAppConfig(), e, canvasElement);
    $eventsManagerStore = $eventsManagerStore;
    mouseHandlerStore = mouseHandlerStore;
  }

  onMount(() => {
    canvasWrapper = new CanvasWrapperImpl(canvasElement, {
      width: canvasElement.clientWidth,
      height: canvasElement.clientHeight,
    });
  });
</script>

<div>
  <Toolbar
    {colors}
    {brushThicknessValues}
    selectedColor={$colorStore}
    selectedEventMode={$drawingEventModeStore}
    selectedBrushThickness={$brushThicknessStore}
    isRedoAvailable={$isRedoAvailableStore}
    isUndoAvailable={$isUndoAvailableStore}
    on:modeChange={(e) => onModeChange(e.detail.newMode)}
    on:colorChange={(e) => onColorChange(e.detail.newColor)}
    on:brushThicknessChange={(e) => onBrushThicknessChange(e.detail.newBrushThickness)}
    on:undo={onUndoButtonClick}
    on:redo={onRedoButtonClick}
    on:clear={onClearButtonClick}
  />

  <canvas
    bind:this={canvasElement}
    class={classes('mt-4 mx-auto bg-[white]', 'w-full max-w-3xl aspect-video')}
    on:mousedown={(e) => onMouseDown(e)}
    on:mouseup={(e) => onMouseUp(e)}
    on:mousemove={(e) => onMouseMove(e)}
  >
    <p>Sorry, canvas element is not supported in your browser</p>
  </canvas>
</div>
