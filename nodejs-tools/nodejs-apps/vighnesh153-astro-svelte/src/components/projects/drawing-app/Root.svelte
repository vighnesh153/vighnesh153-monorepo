<script lang="ts">
  import { type EventMode, Color, type IColor } from '@vighnesh153/drawing-app';

  import { brushThicknessStore, colorStore, drawingAppConfigStore } from '@/store/projects/drawing-app';
  import Toolbar from './Toolbar.svelte';

  const colors: IColor[] = Object.values(Color);

  $: appConfig = $drawingAppConfigStore;

  function onModeChange(newMode: EventMode) {
    if (newMode === 'draw') {
      $drawingAppConfigStore = {
        mode: newMode,
        brushThickness: $brushThicknessStore,
        color: $colorStore,
      };
    } else if (newMode === 'fill') {
      $drawingAppConfigStore = {
        mode: newMode,
        color: $colorStore,
      };
    }
  }

  function onColorChange(newColor: IColor) {
    drawingAppConfigStore.update((old) => ({
      ...old,
      color: newColor,
    }));
  }
</script>

<div>
  <Toolbar
    {colors}
    {appConfig}
    on:modeChange={(e) => onModeChange(e.detail.newMode)}
    on:colorChange={(e) => onColorChange(e.detail.newColor)}
  />
</div>
