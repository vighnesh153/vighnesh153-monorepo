<script lang="ts">
  import { classes } from '@/utils';
</script>

<div class="flex flex-col">
  <button
    class={classes(
      'w-[40px] aspect-square rounded-full grid place-items-center border-2 border-secondary',
      'focus-visible:outline-secondary'
    )}
    on:click
  >
    <slot />
  </button>
  <div class="mt-2 text-secondary">
    <slot name="title">Title</slot>
  </div>
</div>
