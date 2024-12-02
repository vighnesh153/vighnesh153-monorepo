<script lang="ts">
  import { onMount } from 'svelte';
  import { SplInterpreter, SPLReservedKeywords, SplExamples } from '@vighnesh153/spl';
  import type { SimpleCodeToHtmlOptions } from '@vighnesh153/simple-code-to-html';

  import { classes, internalLinks, searchParams } from '@/utils/index.ts';
  import Link from '@/components/Link.svelte';
  import CodeConsole from '@/components/projects/spl/CodeConsole.svelte';
  import SimpleCodeEditor from '@/components/projects/SimpleCodeEditor.svelte';

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

  onMount(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const exampleId = urlSearchParams.get(searchParams.exampleId) ?? null;
    const example = SplExamples.find((e) => e.id === exampleId) ?? null;

    if (example !== null) {
      code = example.code.trim() + '\n';
    }
  });
</script>

<div
  class={classes(
    'w-full mt-10',
    'lg:h-[50vh]',
    'grid grid-cols-1 place-items-center gap-6',
    'lg:grid-cols-3 lg:grid-rows-5 lg:place-items-stretch'
  )}
>
  <div class="lg:col-start-3 grid place-items-center">
    <Link linkType="primary-btn" href={internalLinks.projects.spl.mainMenu}>SPL Main Menu</Link>
  </div>
  <div
    class={classes(
      'w-full',
      'lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:row-end-[-1]',
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
    className={classes('w-full', 'lg:row-start-2 lg:row-end-[-1]', 'bg-backgroundLight', 'rounded-md')}
  />
</div>
