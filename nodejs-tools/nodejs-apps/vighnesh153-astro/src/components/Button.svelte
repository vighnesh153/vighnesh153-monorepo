<script lang="ts">
  import { classes } from '@/utils/index.ts';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface $$Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary';
  }
  export let variant: $$Props['variant'] = 'secondary';

  const { class: className } = $$props;
</script>

<button {...$$props} class={classes(className, `${variant}-button`)} on:click>
  <slot />
</button>
