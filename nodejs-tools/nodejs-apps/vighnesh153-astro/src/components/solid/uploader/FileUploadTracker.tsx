// @ts-nocheck
/* eslint-disable @typescript-eslint/no-use-before-define */
import { type JSX, Match, Switch } from "solid-js";
import { assert } from "@std/assert";
import { type FileUploadState } from "@vighnesh153/tools/file_upload";

import { classes } from "@/utils/index.ts";
import { FileIcon } from "@/icons/solid/index.ts";

export type FileUploadTrackerProps = {
  fileState: FileUploadState;
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
        `,
      )}
      classList={props.classList}
    >
      <FileIcon class="w-5" />
      <p class={classes(`inline-block flex-1`)}>{props.fileState.file.name}</p>
      <Switch fallback={<p class="text-[red]">Invalid upload status</p>}>
        <Match when={props.fileState.type === "queued"}>Spinner</Match>
        <Match when={props.fileState.type === "fetching-upload-metadata"}>
          Spinner
        </Match>
        <Match when={props.fileState.type === "in-progress"}>
          <UploadProgress fileState={props.fileState} />
        </Match>
        <Match when={props.fileState.type === "complete"}>Green check</Match>
        <Match when={props.fileState.type === "error"}>
          <UploadError fileState={props.fileState} />
        </Match>
      </Switch>
    </li>
  );
}

function UploadProgress({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "in-progress");
  return (
    <progress
      class={classes(`h-2 rounded-2xl overflow-hidden`, "progress-bar")}
      value={fileState.uploadedBytes}
      max={fileState.totalBytes}
      aria-label="Upload status"
    />
  );
}

function UploadError({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "error");
  return fileState.error.message;
}
