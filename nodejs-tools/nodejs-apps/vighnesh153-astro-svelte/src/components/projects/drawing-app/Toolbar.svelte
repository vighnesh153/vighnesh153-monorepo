<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { type EventMode, type AppConfig } from '@vighnesh153/drawing-app';

  import PenIcon from '@/icons/PenIcon.svelte';
  import FillDripIcon from '@/icons/FillDripIcon.svelte';
  import ModeButton from './ModeButton.svelte';
  import ToolbarDivider from './ToolbarDivider.svelte';
  import ColorButton from './ColorButton.svelte';

  export let appConfig: AppConfig;

  type EventDispatcher = {
    modeChange: { newMode: EventMode };
  };

  const dispatch = createEventDispatcher<EventDispatcher>();

  function onModeChange(newMode: EventMode) {
    dispatch('modeChange', { newMode });
  }
</script>

<div class="w-2/3 p-6 mx-auto bg-text flex items-center gap-8 rounded-lg">
  <!-- Mode -->
  <div class="flex gap-6">
    <ModeButton isSelected={appConfig.mode === 'draw'} on:click={() => onModeChange('draw')}>
      <PenIcon class="w-6" />
    </ModeButton>
    <ModeButton isSelected={appConfig.mode === 'fill'} on:click={() => onModeChange('fill')}>
      <FillDripIcon class="w-6" />
    </ModeButton>
  </div>

  <ToolbarDivider />

  <!-- Color button -->
  <div>
    <ColorButton selectedColor={appConfig.color.rgbaString}></ColorButton>
  </div>

  <ToolbarDivider />
</div>
