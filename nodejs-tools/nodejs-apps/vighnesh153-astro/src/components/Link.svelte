<script lang="ts">
  import { classes } from '@/utils';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  interface $$Props extends HTMLAnchorAttributes {
    linkType?: 'regular' | 'primary-btn' | 'secondary-btn';
  }
  export let linkType: $$Props['linkType'] = 'regular';

  const { class: className, href } = $$props;
</script>

<a {...$$props} {href} class={classes(className, `${linkType}-link`)}>
  <slot />
</a>
