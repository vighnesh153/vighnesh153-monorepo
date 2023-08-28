<script lang="ts">
  import { classes } from '@/utils';

  export let buttonClasses: string = '';
  export let buttonStyles: string = '';
</script>

<div class="relative">
  <button style={buttonStyles} class={classes(`w-11 h-11 rounded-full border-2 border-secondary`, buttonClasses)}>
    <slot />
  </button>
  <div class="absolute top-16">
    <slot name="popup-content">Popup content</slot>
  </div>
</div>
