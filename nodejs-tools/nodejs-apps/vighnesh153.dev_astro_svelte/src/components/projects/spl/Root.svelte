<script lang="ts">
  import Button from '@/components/Button.svelte';
  import CodeConsole from '@/components/projects/spl/CodeConsole.svelte';
  import SimpleCodeEditor from '@/components/projects/SimpleCodeEditor.svelte';
  import { classes } from '@/utils';
  import { SplInterpreter, SPLReservedKeywords } from '@vighnesh153/spl';
  import type { SimpleCodeToHtmlOptions } from '@vighnesh153/simple-code-to-html';

  let code = '';
  let output = '';
  let outputGeneratedAt: Date | null = null;

  const simpleCodeToHtmlOptions: SimpleCodeToHtmlOptions = {
    acceptableStringChars: ['"'],
    escapeCharacters: [],
    multiLineCommentIdentifierPairs: new Map(),
    operators: '~!@#$%^&*()-_=+{[}]|\\:;<,>.?/',
    reservedWords: SPLReservedKeywords,
    singleLineCommentIdentifiers: [],
  };

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
  <div
    class={classes(
      'w-full',
      'min-h-[30rem]',
      'lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1',
      'max-h-[60vh]',
      'bg-backgroundDark',
      'focus-within:outline-[transparent]',
      'z-[1]',
      'rounded-none'
    )}
  >
    <SimpleCodeEditor bind:inputCode={code} {simpleCodeToHtmlOptions} />
  </div>
  <CodeConsole
    bind:output
    bind:outputGeneratedAt
    on:run-program={runProgram}
    className={classes('w-full', 'h-[30rem]', 'bg-backgroundLight', 'rounded-md')}
  />
</div>
