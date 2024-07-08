<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { not } from '@vighnesh153/tools-platform-independent';
  import { type EventMode, type IColor, BrushThickness } from '@vighnesh153/drawing-app';

  import CloseIcon from '@/icons/CloseIcon.svelte';
  import PenIcon from '@/icons/PenIcon.svelte';
  import FillDripIcon from '@/icons/FillDripIcon.svelte';
  import RotateLeftIcon from '@/icons/RotateLeftIcon.svelte';
  import RotateRightIcon from '@/icons/RotateRightIcon.svelte';

  import ModeButton from './ModeButton.svelte';
  import ToolbarDivider from './ToolbarDivider.svelte';
  import ColorButton from './ColorButton.svelte';
  import BrushThicknessButton from './BrushThicknessButton.svelte';
  import ActionButton from './ActionButton.svelte';
  import { classes } from '@/utils';

  export let selectedColor: IColor;
  export let selectedEventMode: EventMode;
  export let selectedBrushThickness: BrushThickness;
  export let isUndoAvailable: boolean;
  export let isRedoAvailable: boolean;
  export let colors: IColor[];
  export let brushThicknessValues: BrushThickness[];

  type EventDispatcher = {
    modeChange: { newMode: EventMode };
    colorChange: { newColor: IColor };
    undo: void;
    redo: void;
    clear: void;
    brushThicknessChange: { newBrushThickness: BrushThickness };
  };

  const dispatch = createEventDispatcher<EventDispatcher>();

  function onModeChange(newMode: EventMode) {
    dispatch('modeChange', { newMode });
  }

  function onColorChange(newColor: IColor) {
    dispatch('colorChange', { newColor });
  }

  function onBrushThicknessChange(newBrushThickness: BrushThickness) {
    dispatch('brushThicknessChange', { newBrushThickness });
  }

  function onUndoButtonClick() {
    dispatch('undo');
  }

  function onRedoButtonClick() {
    dispatch('redo');
  }

  function onClearButtonClick() {
    dispatch('clear');
  }
</script>

<div class={classes('w-fit px-6 pt-5 pb-4 mx-auto bg-text rounded-lg', 'flex items-center gap-6 flex-wrap')}>
  <!-- Mode -->
  <div class="flex gap-6">
    <ModeButton isSelected={selectedEventMode === 'draw'} on:click={() => onModeChange('draw')}>
      <PenIcon class="w-6 h-6" />
      <p slot="title">Draw</p>
    </ModeButton>
    <ModeButton isSelected={selectedEventMode === 'fill'} on:click={() => onModeChange('fill')}>
      <FillDripIcon class="w-6 h-6" />
      <p slot="title">Fill</p>
    </ModeButton>
  </div>

  <ToolbarDivider />

  <!-- Color button -->
  <div>
    <ColorButton
      selectedColor={selectedColor.rgbaString}
      {colors}
      on:colorChange={(e) => onColorChange(e.detail.newColor)}
    />
  </div>

  <ToolbarDivider />

  <!-- Size button -->
  <div>
    <BrushThicknessButton
      {selectedBrushThickness}
      selectedColor={selectedColor.rgbaString}
      {brushThicknessValues}
      on:brushThicknessChange={(e) => onBrushThicknessChange(e.detail.newBrushThickness)}
    />
  </div>

  <ToolbarDivider />

  <!-- Undo button -->
  <ActionButton disabled={not(isUndoAvailable)} on:click={onUndoButtonClick}>
    <RotateLeftIcon class="w-[25px]" />
    <p slot="title">Undo</p>
  </ActionButton>

  <ToolbarDivider />

  <!-- Redo button -->
  <ActionButton disabled={not(isRedoAvailable)} on:click={onRedoButtonClick}>
    <RotateRightIcon class="w-[25px]" />
    <p slot="title">Redo</p>
  </ActionButton>

  <ToolbarDivider />

  <!-- Clear button -->
  <ActionButton on:click={onClearButtonClick}>
    <CloseIcon class="w-[20px]" stroke="inherit" />
    <p slot="title">Clear</p>
  </ActionButton>
</div>
