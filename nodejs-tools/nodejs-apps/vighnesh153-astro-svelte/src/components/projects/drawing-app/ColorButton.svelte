<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IColor } from '@vighnesh153/drawing-app';
  import PopupButton from './PopupButton.svelte';

  export let selectedColor: string;
  export let colors: IColor[];

  type EventDispatcher = {
    colorChange: { newColor: IColor };
  };

  const dispatch = createEventDispatcher<EventDispatcher>();

  function onColorClick(newColor: IColor) {
    dispatch('colorChange', { newColor });
  }
</script>

<PopupButton buttonStyles={`background-color: ${selectedColor}`}>
  <div slot="popup-content" class="w-96 mx-auto flex gap-2 flex-wrap justify-center" let:togglePopup>
    {#each colors as color}
      <button
        style={`background-color: ${color.rgbaString}`}
        class="w-10 h-10 rounded-full border border-secondary"
        on:click={() => {
          onColorClick(color);
          togglePopup('closed');
        }}
      />
    {/each}
  </div>
</PopupButton>
