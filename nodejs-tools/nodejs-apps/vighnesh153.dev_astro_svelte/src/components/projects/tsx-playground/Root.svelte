<script lang="ts">
  import { classes } from '@/utils';
  import { debounce } from '@vighnesh153/utils';
  import { starterCode, bundle } from '@vighnesh153/tsx-bundler';

  import SimpleCodeEditor from '@/components/projects/SimpleCodeEditor.svelte';

  import CodePreview, { type CodePreviewResult } from './CodePreview.svelte';

  let code = starterCode.trimStart();
  let result: CodePreviewResult = {
    status: 'bundling',
  };

  const runCode = debounce(async (inputCode: string) => {
    result = { status: 'bundling' };

    const bundleResult = await bundle(inputCode);

    if (bundleResult.status === 'success') {
      result = {
        status: 'success',
        outputCode: bundleResult.outputCode,
      };
    } else {
      result = {
        status: 'error',
        bundleError: bundleResult.error,
      };
    }
  }, 1000);

  $: {
    runCode(code);
  }
</script>

<div class={classes('w-full mt-10', 'h-[50vh]', 'flex', 'items-stretch')}>
  <div class={classes('w-1/2', 'bg-backgroundDark', 'focus-within:outline-[transparent]', 'z-[1]', 'rounded-none')}>
    <SimpleCodeEditor bind:inputCode={code} />
  </div>
  <div class="w-1/2">
    <CodePreview {result} />
  </div>
</div>
