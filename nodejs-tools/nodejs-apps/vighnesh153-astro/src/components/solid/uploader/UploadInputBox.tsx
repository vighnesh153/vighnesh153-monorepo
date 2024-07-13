import { type JSX } from 'solid-js';
import { UploadIcon } from '@/icons/solid';
import { classes } from '@/utils';

export type UploadInputBoxProps = {
  onFilesChange: (files: File[]) => void;
};

export function UploadInputBox(props: UploadInputBoxProps) {
  const onChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (e) => {
    const { files } = e.target;
    if (files !== null) {
      props.onFilesChange([...files]);
    }
  };

  return (
    <label class="w-full cursor-pointer">
      <input type="file" class="hidden" multiple onChange={onChange} />
      <div
        class={classes(`
          w-full
          py-20
          px-6
          
          border-4 border-dotted border-accent 
          rounded-2xl

          flex 
          flex-col gap-2
          items-center justify-center
        `)}
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
