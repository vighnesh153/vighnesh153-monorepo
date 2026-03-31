import { useRef, type JSX } from "react";
import {
  simpleCodeToHtml,
  type SimpleCodeToHtmlOptions,
} from "@vighnesh153/simple-code-to-html";
import { classes } from "@/utils/classes.ts";

import "./SimpleCodeEditor.css";

export type SimpleCodeEditorProps = {
  inputCode: string;
  updateInputCode: (newCode: string) => void;
  simpleCodeToHtmlOptions?: SimpleCodeToHtmlOptions;
};

export function SimpleCodeEditor(props: SimpleCodeEditorProps): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberContainerRef = useRef<HTMLDivElement>(null);
  const codeAsHtmlRef = useRef<HTMLDivElement>(null);

  const linesCount = props.inputCode.split(`\n`).length;
  const codeAsHtml = simpleCodeToHtml(
    props.inputCode,
    props.simpleCodeToHtmlOptions,
  );

  const handleTextareaScroll = () => {
    if (!textAreaRef.current || !codeAsHtmlRef.current ||
      !lineNumberContainerRef.current) return;

    // scroll top
    codeAsHtmlRef.current.scrollTop = textAreaRef.current.scrollTop;
    lineNumberContainerRef.current.scrollTop = textAreaRef.current.scrollTop;

    // scroll left
    codeAsHtmlRef.current.scrollLeft = textAreaRef.current.scrollLeft;
  };

  return (
    <div
      className={classes(
        "py-1",
        "pr-2",
        "w-full",
        "h-full",
        "overflow-hidden",
        "flex",
        "flex-row",
        "bg-bg-dark",
      )}
    >
      {/* Line number container */}
      <div
        ref={lineNumberContainerRef}
        className={classes(
          "h-full",
          "overflow-hidden",
          "bg-bg-dark",
          "px-2",
          "z-[2]",
        )}
        style={{
          fontFamily: "monospace",
        }}
      >
        {Array.from({ length: linesCount }).map((_, index) => (
          <span key={index}>
            {index + 1}
            <br />
          </span>
        ))}
      </div>

      <div className={classes("grow", "relative")}>
        {/* Textarea */}
        <textarea
          ref={textAreaRef}
          onScroll={handleTextareaScroll}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className={classes(
            "w-full",
            "h-full",
            "absolute",
            "text-[transparent]",
            "border-none",
            "focus:outline-hidden",
            "resize-none",
            "whitespace-pre",
            "z-[2]",
            "bg-[transparent]",
            "caret-[red]",
          )}
          style={{
            fontFamily: "monospace",
          }}
          value={props.inputCode}
          onChange={(e) => props.updateInputCode(e.target.value)}
        />

        {/* Code as HTML */}
        <div
          ref={codeAsHtmlRef}
          className={classes(
            "w-full",
            "h-full",
            "absolute",
            "overflow-hidden",
            "text-[lightblue]",
            "whitespace-pre",
          )}
          style={{
            fontFamily: "monospace",
          }}
          dangerouslySetInnerHTML={{ __html: codeAsHtml + "<br>" }}
        />
      </div>
    </div>
  );
}
