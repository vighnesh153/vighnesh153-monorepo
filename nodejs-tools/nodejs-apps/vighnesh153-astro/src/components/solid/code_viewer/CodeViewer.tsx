import { createSignal, Show, type JSX } from 'solid-js';
import { not } from '@vighnesh153/tools-platform-independent';
import { createSnackbar } from '@/stores/snackbar';
import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from '@/icons/solid';
import { classes } from '@/utils';

export type HtmlCodeViewerProps = {
  code: string;
  fileName: string;
  lang: 'kotlin';

  viewEntireCode?: boolean;
  maxCodeBodyHeight?: number;
};

export function CodeViewer({
  code,
  fileName,
  viewEntireCode = false,
  maxCodeBodyHeight = 500,
}: HtmlCodeViewerProps): JSX.Element {
  const lineCount = code.split('\n').length;
  const [showFullCode, setShowFullCode] = createSignal(false);

  const onCopyClick = async () => {
    try {
      navigator.clipboard.writeText(code);
      createSnackbar({ type: 'success', message: 'Copied to Clipboard!', manualDismissible: true });
    } catch (e) {
      console.error(e);
      createSnackbar({ type: 'error', message: 'Error occurred while copying to clip board.' });
    }
  };

  const toggleShowFullCode = () => setShowFullCode((old) => not(old));

  // TODO: convert code to html with syntax highlighting
  return (
    <div
      class="rounded-xl overflow-clip bg-secondary border border-text4"
      style={{
        'font-family': 'Courier, Menlo, Consolas',
      }}
    >
      {/* Header */}
      <div class="w-full px-4 py-2 flex justify-between items-center border-b border-b-text4">
        <p>{fileName}</p>
        <button class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg" onClick={onCopyClick}>
          <CopyIcon class="fill-text w-4" /> Copy
        </button>
      </div>

      {/* Code body */}
      <div
        class="p-4 w-full whitespace-pre flex bg-[#16181d] overflow-auto"
        style={{
          'max-height': not(viewEntireCode) && not(showFullCode()) ? `${maxCodeBodyHeight}px` : 'unset',
        }}
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

      {/* Footer */}
      <Show when={not(viewEntireCode)}>
        <div class="w-full px-4 py-2 border-t border-t-text4">
          <Show
            when={showFullCode()}
            fallback={
              <button onClick={toggleShowFullCode} class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg">
                <ChevronDownIcon class="fill-text w-4" /> Show more
              </button>
            }
          >
            <button onClick={toggleShowFullCode} class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg">
              <ChevronUpIcon class="fill-text w-4" /> Show less
            </button>
          </Show>
        </div>
      </Show>
    </div>
  );
}
