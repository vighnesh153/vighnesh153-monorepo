import { createSignal, type JSX, Show } from "solid-js";
import { not } from "@vighnesh153/tools";
import { createSnackbar } from "@/stores/snackbar.ts";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
} from "@/icons/solid/index.ts";
import { classes } from "@/utils/index.ts";

export type HtmlCodeViewerProps = {
  code: string;
  fileName: string;
  lang: "kotlin";

  viewEntireCode?: boolean;
  maxCodeBodyHeight?: number;
};

export function CodeViewer({
  code,
  fileName,
  viewEntireCode = false,
  maxCodeBodyHeight = 500,
}: HtmlCodeViewerProps): JSX.Element {
  const lineCount = code.split("\n").length;
  const [showFullCode, setShowFullCode] = createSignal(false);

  const onCopyClick = async () => {
    try {
      navigator.clipboard.writeText(code);
      createSnackbar({
        type: "success",
        message: "Copied to Clipboard!",
        manualDismissible: true,
      });
    } catch (e) {
      console.error(e);
      createSnackbar({
        type: "error",
        message: "Error occurred while copying to clip board.",
      });
    }
  };

  const toggleShowFullCode = () => setShowFullCode((old) => not(old));

  return (
    <div
      class="rounded-xl bg-secondary border border-text4"
      style={{
        "font-family": "Courier, Menlo, Consolas",
      }}
    >
      {/* Header */}
      <div class="w-full px-4 py-2 flex justify-between items-center border-b border-b-text4">
        <p>{fileName}</p>
        <button
          class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg"
          onClick={onCopyClick}
        >
          <CopyIcon class="fill-text w-4" /> Copy
        </button>
      </div>

      {/* Code body */}
      <div
        class="relative py-4 w-full whitespace-pre flex items-stretch bg-[#16181d] overflow-auto"
        style={{
          "max-height": not(viewEntireCode) && not(showFullCode())
            ? `${maxCodeBodyHeight}px`
            : "unset",
        }}
      >
        <div class="sticky h-full ps-4 pe-2 left-0 bg-[inherit]">
          {Array.from({ length: lineCount })
            .map((_, index) => `${index + 1}`.padStart(3, " "))
            .join("\n")}
        </div>
        <div
          class={classes(`
            ps-6
            pe-4
            
            flex-grow
            items-stretch
          `)}
          innerText={code}
        />
      </div>

      {/* Footer */}
      <Show when={not(viewEntireCode)}>
        <div class="w-full px-4 py-2 border-t border-t-text4">
          <Show
            when={showFullCode()}
            fallback={
              <button
                onClick={toggleShowFullCode}
                class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg"
              >
                <ChevronDownIcon class="fill-text w-4" /> Show more
              </button>
            }
          >
            <button
              onClick={toggleShowFullCode}
              class="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg"
            >
              <ChevronUpIcon class="fill-text w-4" /> Show less
            </button>
          </Show>
        </div>
      </Show>
    </div>
  );
}
