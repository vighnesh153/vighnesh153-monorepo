import { createEffect, createSignal, onCleanup, type JSX } from 'solid-js';

import { UploadInputBox } from './UploadInputBox';
import { FilesUploadTracker } from './FilesUploadTracker';

export type UploadManagerProps = {
  // TODO: add some props here
};

// UI inspiration: https://dribbble.com/shots/20881427-Stratis-UI-Misc-Containers
export function UploadManager(props: UploadManagerProps): JSX.Element {
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

  // TODO: Handle drag and drop event

  return (
    <div>
      <UploadInputBox onFilesChange={(newFiles) => setFilesToUpload((o) => [...newFiles, ...o])} />
      <FilesUploadTracker files={filesToUpload()} class="mt-4" />
    </div>
  );
}
