<script lang="ts">
  import { type EventMode, Color, type IColor, BrushThickness } from '@vighnesh153/drawing-app';

  import { brushThicknessStore, colorStore, drawingEventModeStore } from '@/store/projects/drawing-app';
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
</script>

<div>
  <Toolbar
    {colors}
    {brushThicknessValues}
    selectedColor={$colorStore}
    selectedEventMode={$drawingEventModeStore}
    selectedBrushThickness={$brushThicknessStore}
    on:modeChange={(e) => onModeChange(e.detail.newMode)}
    on:colorChange={(e) => onColorChange(e.detail.newColor)}
    on:brushThicknessChange={(e) => onBrushThicknessChange(e.detail.newBrushThickness)}
  />
</div>
