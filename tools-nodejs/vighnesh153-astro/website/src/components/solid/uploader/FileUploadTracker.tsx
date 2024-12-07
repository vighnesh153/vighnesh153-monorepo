import { type JSX, Match, Switch } from "solid-js";
import { assert } from "@std/assert";
import { type FileUploadState } from "@vighnesh153/tools/file_upload";

import { Spinner } from "@/components/solid/Spinner.tsx";
import { CheckIcon, FileIcon } from "@/icons";
import { createSnackbar } from "@/store/snackbar.ts";
import { classes, copyToClipboard } from "@/utils/index.ts";

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
        <Match when={props.fileState.type === "queued"}>
          <Queued fileState={props.fileState} />
        </Match>
        <Match when={props.fileState.type === "fetching-upload-metadata"}>
          <FetchingUploadMetadata fileState={props.fileState} />
        </Match>
        <Match when={props.fileState.type === "error-fetching-upload-metadata"}>
          <ErrorFetchingUploadMetadata fileState={props.fileState} />
        </Match>
        <Match when={props.fileState.type === "upload-in-progress"}>
          <UploadProgress fileState={props.fileState} />
        </Match>
        <Match when={props.fileState.type === "upload-complete"}>
          <UploadComplete fileState={props.fileState} />
        </Match>
        <Match when={props.fileState.type === "upload-error"}>
          <UploadError fileState={props.fileState} />
        </Match>
      </Switch>
    </li>
  );
}

function Queued({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "queued");
  return (
    <div class="flex gap-3">
      <span class="text-text2 text-sm">Queued</span>
      <Spinner width={20} />
    </div>
  );
}

function FetchingUploadMetadata({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "fetching-upload-metadata");
  return (
    <div class="flex gap-3">
      <span class="text-text2 text-sm">Fetching upload metadata</span>
      <Spinner width={20} />
    </div>
  );
}

function ErrorFetchingUploadMetadata(
  { fileState }: { fileState: FileUploadState },
) {
  assert(fileState.type === "error-fetching-upload-metadata");
  return (
    <p class="text-[#c42525] max-w-80 text-sm">
      Failed to fetch upload metadata: {fileState.error.message}
    </p>
  );
}

function UploadProgress({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "upload-in-progress");

  const percent = (fileState.uploadedBytes * 100 / fileState.totalBytes)
    .toFixed(2);

  return (
    <div class="flex gap-3 items-center">
      <span class="text-text2 text-sm">{percent}%</span>
      <progress
        class={classes(`h-2 rounded-2xl overflow-hidden`, "progress-bar")}
        value={fileState.uploadedBytes}
        max={fileState.totalBytes}
        aria-label="Upload status"
      />
    </div>
  );
}

function UploadComplete({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "upload-complete");

  const copyPath = async () => {
    await copyToClipboard(fileState.filePath);
    createSnackbar({
      type: "info",
      message: "Copied path to Clipboard!",
      manualDismissible: true,
    });
  };

  return (
    <div class="flex gap-4">
      <button
        class={classes(`
          px-1
          
          bg-primary
          text-sm
          
          rounded-lg

          hover:scale-[1.02]
        `)}
        onClick={() => copyPath()}
      >
        Copy path
      </button>
      <p class="text-sm">
        <CheckIcon fill="#19c827" width={20} />
      </p>
    </div>
  );
}

function UploadError({ fileState }: { fileState: FileUploadState }) {
  assert(fileState.type === "upload-error");
  return (
    <p class="text-[#c42525] max-w-80 text-sm">
      Failed to upload file: {fileState.error.message}
    </p>
  );
}
