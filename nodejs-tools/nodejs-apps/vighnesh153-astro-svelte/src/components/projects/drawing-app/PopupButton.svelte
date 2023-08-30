<script lang="ts">
  import { classes } from '@/utils';

  export let buttonClasses: string = '';
  export let buttonStyles: string = '';

  type PopupState = 'open' | 'closed';

  let popupState: PopupState = 'closed';

  function togglePopup(state?: PopupState) {
    // prettier-ignore
    popupState = state !== undefined 
      ? state 
      : (popupState === 'open' ? 'closed' : 'open');
  }
</script>

<div class="relative">
  <div class="flex flex-col">
    <button
      style={buttonStyles}
      class={classes(`w-11 h-11 rounded-full border-2 border-secondary`, buttonClasses)}
      on:click={() => togglePopup()}
    >
      <slot />
    </button>
    {#if true || $$slots.title}
      <div class="mt-1 text-secondary font-bold">
        <slot name="title">Title</slot>
      </div>
    {/if}
  </div>
  {#if $$slots['popup-content'] && popupState === 'open'}
    <div class="absolute top-16 -translate-x-1/2 z-[1000000] w-fit p-6 bg-text shadow-2xl shadow-primary rounded-lg">
      <slot name="popup-content" {togglePopup} />
    </div>
  {/if}
</div>
