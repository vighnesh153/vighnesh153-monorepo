import { type JSX, onMount } from 'solid-js';
import { classes } from '@/utils';
import { CopyIcon } from '@/icons/solid';
import { useSnackbar } from '../snackbar';

export type HtmlCodeViewerProps = {
  code: string;
  fileName: string;
  lang: 'kotlin';
};

export function CodeViewer({ code, fileName }: HtmlCodeViewerProps): JSX.Element {
  const { createSnackbar } = useSnackbar();

  // const lineCount = code.split('\n').length;
  const lineCount = 200;

  onMount(() => {
    createSnackbar({ type: 'success', message: 'Copied to Clipboard!', autoDismissTimeMillis: 5 ** 5 });
    createSnackbar({ type: 'info', message: 'Copied to Clipboard!', autoDismissTimeMillis: 5 ** 5 });
    createSnackbar({ type: 'error', message: 'Copied to Clipboard!', autoDismissTimeMillis: 5 ** 5 });
    createSnackbar({ type: 'warn', message: 'Copied to Clipboard!', autoDismissTimeMillis: 5 ** 5 });
  });

  // TODO: convert code to html with syntax highlighting
  return (
    <div
      class="rounded-xl overflow-clip bg-secondary border border-text4"
      style={{
        'font-family': 'Courier, Menlo, Consolas',
      }}
    >
      <div class="w-full px-4 py-2 flex justify-between items-center border-b border-b-text4">
        <p>{fileName}</p>
        <button class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg">
          <CopyIcon class="fill-text w-4" /> Copy
        </button>
      </div>
      <div
        // class="p-4 w-full whitespace-pre flex bg-[#16181d] overflow-auto"
        class="p-4 w-full whitespace-pre flex bg-[#16181d] overflow-auto"
        style={{ 'max-height': '500px' }}
      >
        <div>
          {Array.from({ length: lineCount })
            .map((_, index) => `${index + 1}`.padStart(3, ' '))
            .join('\n')}
        </div>
        <div
          class={classes(`
            ps-6
            
            flex-grow
            items-stretch
          `)}
          innerText={code}
        />
      </div>
    </div>
  );
}
