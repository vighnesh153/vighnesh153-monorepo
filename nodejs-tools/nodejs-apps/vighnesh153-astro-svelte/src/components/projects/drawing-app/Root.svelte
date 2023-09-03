<script lang="ts">
  import {
    type EventMode,
    Color,
    type IColor,
    BrushThickness,
    undo,
    redo,
    publishEvents,
    buildClearScreenEvent,
  } from '@vighnesh153/drawing-app';

  import {
    brushThicknessStore,
    colorStore,
    drawingEventModeStore,
    isRedoAvailableStore,
    isUndoAvailableStore,
    eventsManagerStore,
  } from '@/store/projects/drawing-app';
  import Toolbar from './Toolbar.svelte';

  const colors: IColor[] = Object.values(Color);
  const brushThicknessValues = [
    BrushThickness.xs,
    BrushThickness.sm,
    BrushThickness.md,
    BrushThickness.lg,
    BrushThickness.xl,
  ];

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
        color: $colorStore,
      }),
    ]);
    $eventsManagerStore = $eventsManagerStore;
  }
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
</div>
