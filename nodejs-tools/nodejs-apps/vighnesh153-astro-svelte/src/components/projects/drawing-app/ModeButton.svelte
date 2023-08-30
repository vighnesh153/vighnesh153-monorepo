<script lang="ts">
  import { not } from '@vighnesh153/utils';
  import { classes } from '@/utils';

  export let isSelected = false;
</script>

<div class="flex flex-col">
  <button
    class={classes(`p-2 rounded-full`)}
    class:outline={isSelected}
    class:outline-offset-4={isSelected}
    class:outline-2={isSelected}
    class:outline-secondary={isSelected}
    class:fill-text={isSelected}
    class:bg-secondary={isSelected}
    on:click
  >
    <slot />
  </button>
  {#if true || $$slots.title}
    <div class="mt-2 text-secondary" class:font-bold={isSelected} class:underline={isSelected}>
      <slot name="title">Title</slot>
    </div>
  {/if}
</div>
