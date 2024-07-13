import { type JSX, Switch, Match } from 'solid-js';

import { classes } from '@/utils';
import { FileIcon } from '@/icons/solid';

export type FileUploadTrackerStatus_InProgress = { type: 'in-progress'; currentValue: number; maxValue: number };
export type FileUploadTrackerStatus_Error = { type: 'error'; errorMessage: string };

export type FileUploadTrackerStatus =
  | { type: 'initializing' }
  | FileUploadTrackerStatus_InProgress
  | { type: 'success' }
  | FileUploadTrackerStatus_Error;

export type FileUploadTrackerProps = {
  file: File;
  uploadStatus: FileUploadTrackerStatus;
  classList?: Record<string, boolean | undefined>;
};

export function FileUploadTracker(props: FileUploadTrackerProps): JSX.Element {
  return (
    <li
      class={classes(
        `
        py-4 px-4

        flex gap-4
        items-center

        border-[inherit]
        `
      )}
      classList={props.classList}
    >
      <FileIcon class="w-5" />
      <p class={classes(`inline-block flex-1`)}>{props.file.name}</p>
      <Switch fallback={<p class="text-[red]">Invalid upload status</p>}>
        <Match when={props.uploadStatus.type === 'initializing'}>Spinner</Match>
        <Match when={props.uploadStatus.type === 'in-progress'}>
          <progress
            class={classes(`h-2 rounded-2xl overflow-hidden`, 'progress-bar')}
            value={(props.uploadStatus as FileUploadTrackerStatus_InProgress).currentValue}
            max={(props.uploadStatus as FileUploadTrackerStatus_InProgress).maxValue}
            aria-label="Upload status"
          />
        </Match>
        <Match when={props.uploadStatus.type === 'success'}>Green check</Match>
        <Match when={props.uploadStatus.type === 'error'}>
          {(props.uploadStatus as FileUploadTrackerStatus_Error).errorMessage}
        </Match>
      </Switch>
    </li>
  );
}
