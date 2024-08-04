import { createEffect, createSignal, onCleanup, type JSX } from 'solid-js';

import { UploadInputBox } from './UploadInputBox';
import { FilesUploadTracker } from './FilesUploadTracker';

export type UploadManagerProps = {
  // TODO: add some props here
};

// UI inspiration: https://dribbble.com/shots/20881427-Stratis-UI-Misc-Containers
export function UploadManager(props: UploadManagerProps): JSX.Element {
  const [draggingOver, setDraggingOver] = createSignal<boolean>(false);
  const [filesToUpload, setFilesToUpload] = createSignal<File[]>([
    // {
    //   name: 'Pikachu.png',
    // },
    // { name: 'Infernape.mp4' },
    // {
    //   name: 'Greninja.pdf',
    // },
  ]);

  createEffect(() => {
    console.log(filesToUpload(), props);
  });

  // Handle clipboard event
  createEffect(() => {
    // Inspiration: https://stackoverflow.com/a/54813627/8822610

    function clipboardEventHandler(e: ClipboardEvent) {
      const items = Array.from(e.clipboardData?.items ?? []);

      const files = items.map((item) => item.getAsFile()).filter((file) => file !== null);
      if (files.length > 0) {
        setFilesToUpload((o) => [...files, ...o]);
      }
    }
    document.addEventListener('paste', clipboardEventHandler);
    onCleanup(() => {
      document.removeEventListener('paste', clipboardEventHandler);
    });
  });

  // Handle drag and drop events
  createEffect(() => {
    function handleDragEnter(e: DragEvent) {
      e.preventDefault();
      setDraggingOver(true);
    }

    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      setDraggingOver(false);
    }

    function handleDragOverEvent(e: DragEvent) {
      e.preventDefault();
    }

    function handleDropEvent(e: DragEvent) {
      e.preventDefault();
      setDraggingOver(false);
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length > 0) {
        setFilesToUpload((o) => [...files, ...o]);
      }
    }

    window.addEventListener('dragover', handleDragOverEvent);
    window.addEventListener('drop', handleDropEvent);
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    onCleanup(() => {
      window.removeEventListener('dragover', handleDragOverEvent);
      window.removeEventListener('drop', handleDropEvent);
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
    });
  });

  return (
    <div>
      <UploadInputBox
        draggingOver={draggingOver()}
        onFilesChange={(newFiles) => setFilesToUpload((o) => [...newFiles, ...o])}
      />
      <FilesUploadTracker files={filesToUpload()} class="mt-4" />
    </div>
  );
}
