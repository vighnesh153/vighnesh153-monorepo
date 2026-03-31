import { useState, type JSX } from "react";
import { not } from "@vighnesh153/tools";
import { createSnackbar } from "@/store/snackbar.ts";
import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from "@/icons";
import { classes } from "@/utils/classes.ts";
import { copyToClipboard } from "@/utils/copy_to_clipboard.ts";

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
  const [showFullCode, setShowFullCode] = useState(false);

  const onCopyClick = async () => {
    try {
      await copyToClipboard(code);
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
      className="rounded-xl bg-secondary border border-text4"
      style={{
        fontFamily: "Courier, Menlo, Consolas",
      }}
    >
      {/* Header */}
      <div className="w-full px-4 py-2 flex justify-between items-center border-b border-b-text4">
        <p>{fileName}</p>
        <button
          className="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg cursor-pointer"
          onClick={onCopyClick}
        >
          <CopyIcon className="fill-text w-4" /> Copy
        </button>
      </div>

      {/* Code body */}
      <div
        className="relative py-4 w-full whitespace-pre flex items-stretch bg-[#16181d] overflow-auto"
        style={{
          maxHeight: not(viewEntireCode) && not(showFullCode)
            ? `${maxCodeBodyHeight}px`
            : "unset",
        }}
      >
        <div className="sticky h-full ps-4 pe-2 left-0 bg-[inherit]">
          {Array.from({ length: lineCount })
            .map((_, index) => `${index + 1}`.padStart(3, " "))
            .join("\n")}
        </div>
        <div
          className={classes(`
            ps-6
            pe-4
            
            grow
            items-stretch
          `)}
        >
          {code}
        </div>
      </div>

      {/* Footer */}
      {not(viewEntireCode) && (
        <div className="w-full px-4 py-2 border-t border-t-text4">
          {showFullCode ? (
            <button
              onClick={toggleShowFullCode}
              className="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg cursor-pointer"
            >
              <ChevronUpIcon className="fill-text w-4" /> Show less
            </button>
          ) : (
            <button
              onClick={toggleShowFullCode}
              className="py-1 px-4 flex items-center gap-2 border border-1 rounded-lg cursor-pointer"
            >
              <ChevronDownIcon className="fill-text w-4" /> Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
