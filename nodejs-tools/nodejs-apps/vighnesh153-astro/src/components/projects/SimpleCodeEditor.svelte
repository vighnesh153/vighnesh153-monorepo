<script lang="ts">
  import { simpleCodeToHtml, type SimpleCodeToHtmlOptions } from '@vighnesh153/simple-code-to-html';
  import { classes } from '@/utils/index.ts';

  export let simpleCodeToHtmlOptions: SimpleCodeToHtmlOptions = {};
  export let inputCode: string;

  let textAreaRef: HTMLTextAreaElement;
  let lineNumberContainerRef: HTMLDivElement;
  let codeAsHtmlRef: HTMLDivElement;

  $: linesCount = inputCode.split('\n').length;
  $: codeAsHtml = simpleCodeToHtml(inputCode, simpleCodeToHtmlOptions);

  function handleTextareaScroll() {
    // scroll top
    codeAsHtmlRef.scrollTop = textAreaRef.scrollTop;
    lineNumberContainerRef.scrollTop = textAreaRef.scrollTop;

    // scroll left
    codeAsHtmlRef.scrollLeft = textAreaRef.scrollLeft;
  }
</script>

<div class={classes('w-full', 'h-full', 'overflow-hidden', 'flex', 'flex-row', 'bg-backgroundDark')}>
  {@html '<!-- Line number container -->'}
  <div
    bind:this={lineNumberContainerRef}
    class={classes('h-full', 'overflow-hidden', 'bg-backgroundDark', 'px-2', 'z-[2]')}
  >
    {#each Array.from({ length: linesCount }) as _, index (index)}
      <span>
        {index + 1}
        <br />
      </span>
    {/each}
  </div>

  <div class={classes('grow', 'relative')}>
    {@html '<!-- Textarea -->'}
    <textarea
      bind:this={textAreaRef}
      on:scroll={handleTextareaScroll}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      class={classes(
        'w-full',
        'h-full',
        'p-0',
        'absolute',
        'text-[transparent]',
        'border-none',
        'focus:outline-none',
        'resize-none',
        'whitespace-pre',
        'z-[2]',
        'bg-[transparent]',
        'caret-[red]'
      )}
      bind:value={inputCode}
    />

    {@html '<!-- Code as HTML -->'}
    <div
      bind:this={codeAsHtmlRef}
      class={classes('w-full', 'h-full', 'absolute', 'overflow-hidden', 'text-[lightblue]', 'whitespace-pre')}
    >
      {@html codeAsHtml + '<br>'}
    </div>
  </div>
</div>

<style>
  :global(.code-string) {
    color: #c2e88d;
  }

  :global(.code-comment) {
    color: #7e7e7e;
  }

  :global(.code-operator) {
    color: #ff5370;
  }

  :global(.code-reserved-word) {
    color: #c792e9;
  }
</style>
