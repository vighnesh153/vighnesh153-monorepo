<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  interface $$Props extends HTMLTextareaAttributes {}

  export let value: $$Props['value'] = '';
</script>

<textarea {...$$props} bind:value />
