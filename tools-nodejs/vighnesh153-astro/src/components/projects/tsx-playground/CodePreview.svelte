<script context="module" lang="ts">
  export type CodePreviewResult =
    | {
        status: 'bundling';
      }
    | {
        status: 'success';
        outputCode: string;
      }
    | {
        status: 'error';
        bundleError: string;
      };
</script>

<script lang="ts">
  import { baseIframeHtmlCode } from '@vighnesh153/tsx-bundler';

  export let result: CodePreviewResult = {
    status: 'bundling',
  };

  let previewIframe: HTMLIFrameElement;

  $: (() => {
    if (result.status === 'success' && previewIframe) {
      const outputCode = result.outputCode;
      previewIframe.srcdoc = baseIframeHtmlCode;
      setTimeout(() => {
        previewIframe.contentWindow?.postMessage(outputCode);
      }, 50);
    }
  })();
</script>

<div class="w-full h-full p-4 bg-text">
  {#if result.status === 'bundling'}
    <div class="text-background">Bundling...</div>
  {:else if result.status === 'error'}
    <div class="text-[red] whitespace-pre overflow-x-auto">
      <div class="font-bold text-xl">Some error occurred while bundling</div>
      <div>{result.bundleError}</div>
    </div>
  {:else}
    <iframe
      bind:this={previewIframe}
      class="w-full h-full"
      title="preview"
      sandbox="allow-same-origin allow-scripts"
      srcdoc={baseIframeHtmlCode}
    />
  {/if}
</div>
