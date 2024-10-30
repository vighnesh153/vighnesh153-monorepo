// @ts-nocheck

import { createEffect, createSignal, type JSX, onCleanup } from "solid-js";

import {
  FileUploadManager,
  type FileUploadState,
} from "@vighnesh153/tools/file_upload";

import { UploadInputBox } from "./UploadInputBox.tsx";
import { FilesUploadTracker } from "./FilesUploadTracker.tsx";

export type UploadManagerProps = {
  // TODO: add some props here
};

// UI inspiration: https://dribbble.com/shots/20881427-Stratis-UI-Misc-Containers
export function UploadInputBoxWithStats(
  props: UploadManagerProps,
): JSX.Element {
  const fileUploadManager = new FileUploadManager();
  const [dragCounter, setDragCounter] = createSignal<number>(0);
  const [fileStates, setFileStates] = createSignal<FileUploadState[]>([]);

  // subscribe to file states
  createEffect(() => {
    const { unsubscribe } = fileUploadManager.subscribe((newFileStates) => {
      setFileStates(newFileStates);
    });

    onCleanup(() => unsubscribe());
  });

  // Handle clipboard event
  createEffect(() => {
    // Inspiration: https://stackoverflow.com/a/54813627/8822610

    function clipboardEventHandler(e: ClipboardEvent) {
      const items = Array.from(e.clipboardData?.items ?? []);

      const files = items.map((item) => item.getAsFile()).filter((file) =>
        file !== null
      );
      if (files.length > 0) {
        fileUploadManager.upload(files);
      }
    }
    document.addEventListener("paste", clipboardEventHandler);
    onCleanup(() => {
      document.removeEventListener("paste", clipboardEventHandler);
    });
  });

  // Handle drag and drop events
  createEffect(() => {
    function handleDragEnter(e: DragEvent) {
      e.preventDefault();
      // Why drag counter instead of just boolean? Because javascript and web is stupid.
      // ref: https://stackoverflow.com/a/21002544/8822610
      setDragCounter(dragCounter() + 1);
    }

    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      setDragCounter(dragCounter() - 1);
    }

    function handleDragOverEvent(e: DragEvent) {
      e.preventDefault();
    }

    function handleDropEvent(e: DragEvent) {
      e.preventDefault();
      setDragCounter(0);
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length > 0) {
        fileUploadManager.upload(files);
      }
    }

    window.addEventListener("dragover", handleDragOverEvent);
    window.addEventListener("drop", handleDropEvent);
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    onCleanup(() => {
      window.removeEventListener("dragover", handleDragOverEvent);
      window.removeEventListener("drop", handleDropEvent);
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
    });
  });

  return (
    <div>
      <div class="relative overflow-hidden">
        <UploadInputBox
          draggingOver={dragCounter() > 0}
          onFilesChange={(newFiles) => fileUploadManager.upload(newFiles)}
        />
      </div>
      <FilesUploadTracker fileStates={fileStates()} class="mt-4" />
    </div>
  );
}
