<script lang="ts">
  import { classes } from '@/utils';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface $$Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary';
  }
  export let variant: $$Props['variant'] = 'secondary';

  const { class: className, ...props } = $$props;
</script>

<button class={classes(className, `${variant}-button`)} {...props} on:click={() => console.log("lolol")}>
  <slot />
</button>
