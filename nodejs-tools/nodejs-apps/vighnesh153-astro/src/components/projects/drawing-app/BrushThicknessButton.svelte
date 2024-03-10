<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { BrushThickness, type IColor } from '@vighnesh153/drawing-app';
  import PopupButton from './PopupButton.svelte';

  export let selectedBrushThickness: BrushThickness;
  export let selectedColor: string;
  export let brushThicknessValues: BrushThickness[];

  type EventDispatcher = {
    brushThicknessChange: { newBrushThickness: BrushThickness };
  };

  const dispatch = createEventDispatcher<EventDispatcher>();

  function onBrushThicknessClick(newBrushThickness: BrushThickness) {
    dispatch('brushThicknessChange', { newBrushThickness });
  }
</script>

<PopupButton>
  <span
    class={`inline-block aspect-square rounded-full`}
    style={`width: ${selectedBrushThickness}px; background: ${selectedColor}`}
  />
  <div slot="popup-content" class="w-64 mx-auto flex gap-2 flex-wrap items-center justify-center" let:togglePopup>
    {#each brushThicknessValues as brushThickness}
      <button
        class="w-[40px] aspect-square rounded-full grid place-items-center border border-secondary focus-visible:outline-secondary"
        on:click={() => {
          onBrushThicknessClick(brushThickness);
          togglePopup('closed');
        }}
      >
        <span
          class={`inline-block aspect-square rounded-full`}
          style={`width: ${brushThickness}px; background: ${selectedColor}`}
        />
      </button>
    {/each}
  </div>
  <p slot="title">Size</p>
</PopupButton>
