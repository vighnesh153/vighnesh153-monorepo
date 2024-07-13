import { For, type JSX, Show } from 'solid-js';

import { classes } from '@/utils';
import { FileUploadTracker } from './FileUploadTracker';

export type FilesUploadTrackerProps = {
  files: File[];
  class?: string;
};

export function FilesUploadTracker(props: FilesUploadTrackerProps): JSX.Element {
  return (
    <Show when={props.files.length > 0}>
      <div class={props.class}>
        <p class="text-text text-lg">Uploading files</p>
        <ul
          class={classes(
            `
              mt-1

              border border-text4
              rounded-lg

              list-none
            `
          )}
        >
          <For each={props.files}>
            {(file, index) => (
              <FileUploadTracker
                file={file}
                classList={{ 'border-t': index() !== 0 }}
                uploadStatus={{ type: 'initializing' }}
              />
            )}
          </For>
        </ul>
      </div>
    </Show>
  );
}
