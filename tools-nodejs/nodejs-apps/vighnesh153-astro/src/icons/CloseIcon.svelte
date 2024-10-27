<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface $$Props extends SVGAttributes<SVGElement> {}
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  stroke="currentColor"
  stroke-width="15"
  stroke-linecap="round"
  stroke-linejoin="round"
  {...$$props}
>
  <path class="top" d="M10,10 L90,90"></path>
  <path class="bottom" d="M10,90 L90,10"></path>
</svg>
