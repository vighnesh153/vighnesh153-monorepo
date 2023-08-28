<script lang="ts">
  import { classes } from '@/utils';

  export let isSelected = false;
</script>

<button
  class={classes(`p-2 rounded-full outline outline-offset-4 outline-2 outline-secondary`)}
  class:fill-text={isSelected}
  class:bg-secondary={isSelected}
  on:click
>
  <slot />
</button>
