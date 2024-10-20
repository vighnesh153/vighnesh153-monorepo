<script lang="ts">
  import { classes } from '@/utils/index.ts';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { not } from '@vighnesh153/tools';

  interface $$Props extends HTMLButtonAttributes {}

  $: isDisabled = $$props.disabled;
</script>

<div class="flex flex-col">
  <button
    {...$$props}
    class={classes(
      'w-[40px] aspect-square rounded-full grid place-items-center border-2',
      'focus-visible:outline-secondary'
    )}
    class:cursor-not-allowed={isDisabled}
    class:stroke-[#aeaeae]={isDisabled}
    class:fill-[#aeaeae]={isDisabled}
    class:border-[#aeaeae]={isDisabled}
    class:stroke-secondary={not(isDisabled)}
    class:fill-secondary={not(isDisabled)}
    class:border-secondary={not(isDisabled)}
    on:click
  >
    <slot />
  </button>
  <div class="mt-2 text-secondary">
    <slot name="title">Title</slot>
  </div>
</div>
