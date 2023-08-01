<script lang="ts">
  export let className: string;

  import { classes } from '@/utils';
</script>

<textarea class={classes(className)}>print("Hello world");</textarea>
