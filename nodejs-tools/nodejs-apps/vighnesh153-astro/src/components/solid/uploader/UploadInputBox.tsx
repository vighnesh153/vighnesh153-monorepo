import { not } from "@vighnesh153/tools";
import { UploadIcon } from "@/icons/solid/index.ts";
import { classes } from "@/utils/index.ts";

export type UploadInputBoxProps = {
  onFilesChange: (files: File[]) => void;

  // This is true when user is dragging a file over the page
  draggingOver: boolean;
};

export function UploadInputBox(props: UploadInputBoxProps) {
  const onNewFiles = (files: File[]) => {
    console.log("new files selected:", files);
    if (files.length > 0) {
      props.onFilesChange([...files]);
    }
  };

  return (
    <label
      class={classes(`
      w-full cursor-pointer 
    `)}
      classList={{}}
    >
      <input
        type="file"
        class="hidden"
        multiple
        onChange={(e) => onNewFiles(Array.from(e.target?.files ?? []))}
      />
      <div
        class={classes(
          `
          w-full
          px-6 py-20

          border-4 border-dotted
          z-px rounded-2xl

          before:bg-[position:0_0,100%_0,100%_100%,0_100%]
          before:bg-[size:50%_50%,50%_50%]
          before:bg-no-repeat
          before:absolute before:-inset-96 before:z-[-2] 

          after:bg-background after:absolute after:inset-1 after:-z-px

          flex 
          flex-col gap-2
          items-center justify-center
        `,
        )}
        classList={{
          "border-[transparent]": props.draggingOver,
          "border-accent": not(props.draggingOver),

          // eslint-disable-next-line max-len
          "before:bg-[linear-gradient(transparent,transparent),linear-gradient(transparent,transparent),linear-gradient(transparent,transparent),linear-gradient(theme(colors.accent),theme(colors.background))]":
            props.draggingOver,
          "before:animate-spin-slow": props.draggingOver,
        }}
      >
        <div class="bg-[hsl(11,0%,50%,0.3)] rounded-md p-2">
          <UploadIcon class="w-7 aspect-square fill-accent" />
        </div>
        <p class="text-text text-3xl text-center">
          Drag & drop files or click to browse files
        </p>
        <p class="text-text2 text-center">
          Tip: You can also upload an image from clipboard by pressing ⌘ + V on
          this page
        </p>
      </div>
    </label>
  );
}
