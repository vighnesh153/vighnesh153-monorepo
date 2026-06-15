import { type JSX, useState } from "react";

import styles from "./CodeViewer.module.css";

import { not } from "@vighnesh153/tools";
import { createSnackbar } from "@/store/snackbar.ts";
import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from "@/icons";
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
      className={styles["code-viewer-container"]}
    >
      {/* Header */}
      <div className={styles["code-viewer-header"]}>
        <p>{fileName}</p>
        <button
          onClick={onCopyClick}
        >
          <CopyIcon className="copy-icon" /> Copy
        </button>
      </div>

      {/* Code body */}
      <div
        className={styles["code-viewer-body"]}
        style={{
          maxHeight: not(viewEntireCode) && not(showFullCode)
            ? `${maxCodeBodyHeight}px`
            : "unset",
        }}
      >
        <div className="line-numbers-container">
          {Array.from({ length: lineCount })
            .map((_, index) => `${index + 1}`.padStart(3, " "))
            .join("\n")}
        </div>
        <div className="code-container">
          {code}
        </div>
      </div>

      {/* Footer */}
      {not(viewEntireCode) && (
        <div className={styles["code-viewer-footer"]}>
          {showFullCode
            ? (
              <button onClick={toggleShowFullCode}>
                <ChevronUpIcon /> Show less
              </button>
            )
            : (
              <button onClick={toggleShowFullCode}>
                <ChevronDownIcon /> Show more
              </button>
            )}
        </div>
      )}
    </div>
  );
}
