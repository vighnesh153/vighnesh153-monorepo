<script lang="ts">
  import type { EventMode } from '@vighnesh153/drawing-app';

  import { brushThicknessStore, colorStore, drawingAppConfigStore } from '@/store/projects/drawing-app';
  import Toolbar from './Toolbar.svelte';

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
</script>

<div>
  <Toolbar {appConfig} on:modeChange={(e) => onModeChange(e.detail.newMode)} />
</div>
