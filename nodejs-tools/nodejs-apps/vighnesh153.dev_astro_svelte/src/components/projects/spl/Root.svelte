<script lang="ts">
  import Button from '@/components/Button.svelte';
  import Textarea from '@/components/projects/spl/Textarea.svelte';
  import CodeConsole from '@/components/projects/spl/CodeConsole.svelte';
  import { classes } from '@/utils';
  import { SplInterpreter } from '@vighnesh153/spl';

  let code = '';
  let output = '';
  let outputGeneratedAt: Date | null = null;

  function runProgram() {
    const splInterpreter = new SplInterpreter(code);
    splInterpreter.compile();
    output = splInterpreter.getOutput();
    outputGeneratedAt = new Date();
  }
</script>

<div
  class={classes(
    'w-full mt-10 min-h-[30rem]',
    'grid grid-cols-1 place-items-center gap-4',
    'lg:grid-cols-3 lg:place-items-stretch'
  )}
>
  <div class="lg:col-start-3 grid place-items-center">
    <Button variant="primary">SPL Main Menu</Button>
  </div>
  <Textarea
    bind:value={code}
    class={classes(
      'w-full',
      'lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1',

      'min-h-[30rem]',
      'bg-backgroundDark',
      'focus:outline-[transparent]',
      'z-[1]',
      'resize-none',
      'rounded-md'
    )}
  />
  <CodeConsole
    bind:output
    bind:outputGeneratedAt
    on:run-program={runProgram}
    className={classes('w-full', 'h-[30rem]', 'bg-backgroundLight', 'rounded-md')}
  />
</div>
