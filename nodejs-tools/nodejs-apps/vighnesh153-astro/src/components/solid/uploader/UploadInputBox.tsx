import { UploadIcon } from '@/icons/solid';
import { classes } from '@/utils';

export type UploadInputBoxProps = {
  onFilesChange: (files: File[]) => void;

  // This is true when user is dragging a file over the page
  draggingOver: boolean;
};

export function UploadInputBox(props: UploadInputBoxProps) {
  const onNewFiles = (files: File[]) => {
    console.log('new files:', files);
    if (files.length > 0) {
      props.onFilesChange([...files]);
    }
  };

  return (
    <label class="w-full cursor-pointer">
      <input type="file" class="hidden" multiple onChange={(e) => onNewFiles(Array.from(e.target?.files ?? []))} />
      <div
        class={classes(`
          w-full
          px-6 py-20
          relative
          
          border-4 border-dotted border-accent 
          rounded-2xl

          flex 
          flex-col gap-2
          items-center justify-center
        `)}
        classList={{
          'animate-pulse': props.draggingOver,
        }}
      >
        <div class="bg-[hsl(11,0%,50%,0.3)] rounded-md p-2">
          <UploadIcon class="w-7 aspect-square fill-accent" />
        </div>
        <p class="text-text text-3xl text-center">Drag & drop files or click to browse files</p>
        <p class="text-text2 text-center">
          Tip: You can also upload an image from clipboard by pressing ⌘ + V on this page
        </p>
      </div>
    </label>
  );
}
