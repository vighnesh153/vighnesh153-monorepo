<script lang="ts">
  import Button from '@/components/Button.svelte';
  import Textarea from '@/components/projects/spl/Textarea.svelte';
  import CodeConsole from '@/components/projects/spl/CodeConsole.svelte';
  import { classes } from '@/utils';

  function runProgram() {
    console.log('running program');
  }
</script>

<div
  class={classes(`
    w-full mt-10 min-h-[30rem]
    
    grid grid-cols-1 place-items-center gap-4
    lg:grid-cols-3 lg:place-items-stretch
  `)}
>
  <div class="lg:col-start-3 grid place-items-center">
    <Button variant="primary">SPL Main Menu</Button>
  </div>
  <Textarea
    className={classes(`
      w-full
      lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1

      min-h-[30rem]
      bg-backgroundDark
      z-[1]
      resize-none
      rounded-md
    `)}
  />
  <CodeConsole
    on:run-program={runProgram}
    className={classes(`
      w-full
      min-h-[30rem]
      bg-backgroundLight
      rounded-md
    `)}
  />
</div>
