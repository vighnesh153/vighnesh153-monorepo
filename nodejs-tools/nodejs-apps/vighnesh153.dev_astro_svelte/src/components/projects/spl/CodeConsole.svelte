<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { classes } from '@/utils';

  const dispatch = createEventDispatcher<{ 'run-program': null }>();

  export let className: string;
</script>

<div class={classes(className)}>
  <div class="bg-secondary p-2 text-center relative">
    <button
      class={classes(`
      absolute left-2 
      px-2
      
      bg-accent text-secondary
      font-bold
      
      cursor-pointer
      rounded-md
    `)}
      on:click={() => {
        console.log('triggerring stuff');
        dispatch('run-program');
      }}
    >
      Run
    </button>
    <span>Console</span>
  </div>
</div>
