import { For } from "solid-js";
import {
  simpleCodeToHtml,
  type SimpleCodeToHtmlOptions,
} from "@vighnesh153/simple-code-to-html";
import { classes } from "@/utils/index.ts";

import "./SimpleCodeEditor.css";

export type SimpleCodeEditorProps = {
  inputCode: string;
  updateInputCode: (newCode: string) => void;
  simpleCodeToHtmlOptions?: SimpleCodeToHtmlOptions;
};

export function SimpleCodeEditor(props: SimpleCodeEditorProps) {
  let textAreaRef!: HTMLTextAreaElement;
  let lineNumberContainerRef!: HTMLDivElement;
  let codeAsHtmlRef!: HTMLDivElement;

  const linesCount = () => props.inputCode.split(`\n`).length;
  const codeAsHtml = () =>
    simpleCodeToHtml(props.inputCode, props.simpleCodeToHtmlOptions);

  const handleTextareaScroll = () => {
    // scroll top
    codeAsHtmlRef.scrollTop = textAreaRef.scrollTop;
    lineNumberContainerRef.scrollTop = textAreaRef.scrollTop;

    // scroll left
    codeAsHtmlRef.scrollLeft = textAreaRef.scrollLeft;
  };

  return (
    <div
      class={classes(
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
        class={classes(
          "h-full",
          "overflow-hidden",
          "bg-bg-dark",
          "px-2",
          "z-[2]",
        )}
        style={{
          "font-family": "monospace",
        }}
      >
        <For each={Array.from({ length: linesCount() })}>
          {(_, index) => (
            <span>
              {index() + 1}
              <br />
            </span>
          )}
        </For>
      </div>

      <div class={classes("grow", "relative")}>
        {/* Textarea */}
        <textarea
          ref={textAreaRef}
          onScroll={handleTextareaScroll}
          autocomplete="off"
          autoCapitalize="off"
          spellcheck={false}
          class={classes(
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
            "font-family": "monospace",
          }}
          value={props.inputCode}
          onInput={(e) => props.updateInputCode(e.target.value)}
        />

        {/* Code as HTML */}
        <div
          ref={codeAsHtmlRef}
          class={classes(
            "w-full",
            "h-full",
            "absolute",
            "overflow-hidden",
            "text-[lightblue]",
            "whitespace-pre",
          )}
          style={{
            "font-family": "monospace",
          }}
          innerHTML={codeAsHtml() + "<br>"}
        />
      </div>
    </div>
  );
}
