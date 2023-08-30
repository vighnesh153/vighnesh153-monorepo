<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { type EventMode, type AppConfig, type IColor } from '@vighnesh153/drawing-app';

  import PenIcon from '@/icons/PenIcon.svelte';
  import FillDripIcon from '@/icons/FillDripIcon.svelte';
  import ModeButton from './ModeButton.svelte';
  import ToolbarDivider from './ToolbarDivider.svelte';
  import ColorButton from './ColorButton.svelte';

  export let appConfig: AppConfig;
  export let colors: IColor[];

  type EventDispatcher = {
    modeChange: { newMode: EventMode };
    colorChange: { newColor: IColor };
  };

  const dispatch = createEventDispatcher<EventDispatcher>();

  function onModeChange(newMode: EventMode) {
    dispatch('modeChange', { newMode });
  }

  function onColorChange(newColor: IColor) {
    dispatch('colorChange', { newColor });
  }
</script>

<div class="w-2/3 px-6 pt-5 pb-4 mx-auto bg-text flex items-center gap-6 rounded-lg">
  <!-- Mode -->
  <div class="flex gap-6">
    <ModeButton isSelected={appConfig.mode === 'draw'} on:click={() => onModeChange('draw')}>
      <PenIcon class="w-6 h-6" />
      <p slot="title">Draw</p>
    </ModeButton>
    <ModeButton isSelected={appConfig.mode === 'fill'} on:click={() => onModeChange('fill')}>
      <FillDripIcon class="w-6 h-6" />
      <p slot="title">Fill</p>
    </ModeButton>
  </div>

  <ToolbarDivider />

  <!-- Color button -->
  <div>
    <ColorButton
      selectedColor={appConfig.color.rgbaString}
      {colors}
      on:colorChange={(e) => onColorChange(e.detail.newColor)}
    />
  </div>

  <ToolbarDivider />
</div>
