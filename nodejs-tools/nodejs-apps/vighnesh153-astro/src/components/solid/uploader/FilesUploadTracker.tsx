import { For, type JSX, Show } from 'solid-js';

import { classes } from '@/utils';
import { FileUploadTracker } from './FileUploadTracker';
import { fileUploader } from '@vighnesh153/tools-platform-independent';

export type FilesUploadTrackerProps = {
  fileStates: fileUploader.FileUploadState[];
  class?: string;
};

export function FilesUploadTracker(props: FilesUploadTrackerProps): JSX.Element {
  return (
    <Show when={props.fileStates.length > 0}>
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
          <For each={props.fileStates}>
            {(fileState, index) => (
              <FileUploadTracker fileState={fileState} classList={{ 'border-t': index() !== 0 }} />
            )}
          </For>
        </ul>
      </div>
    </Show>
  );
}
