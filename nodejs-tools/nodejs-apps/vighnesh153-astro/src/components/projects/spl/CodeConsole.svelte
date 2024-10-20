<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { classes } from '@/utils/index.ts';

  const dispatch = createEventDispatcher<{ 'run-program': null }>();

  export let output: string;
  export let outputGeneratedAt: Date | null;
  export let className: string;
</script>

<div class={classes(className, 'flex flex-col')}>
  <div class="bg-secondary p-2 text-center relative">
    <button
      class={classes(
        'absolute left-2',
        'px-2',

        'bg-accent text-secondary',
        'font-bold',

        'cursor-pointer',
        'rounded-md'
      )}
      on:click={() => dispatch('run-program')}
    >
      Run
    </button>
    <span>Console</span>
  </div>
  <div class="p-2 grow overflow-auto whitespace-pre">
    {#if outputGeneratedAt !== null}
      {`Output at ${outputGeneratedAt.toLocaleString()}\n********************\n${output}`}
    {/if}
  </div>
</div>
