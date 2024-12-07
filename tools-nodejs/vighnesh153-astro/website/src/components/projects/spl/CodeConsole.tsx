import { type JSX, Show } from "solid-js";
import { classes } from "@/utils/index.ts";

export type CodeConsoleProps = {
  output: string;
  outputGeneratedAt: Date | null;
  className: string;
  onRunClick: () => void;
};

export function CodeConsole(props: CodeConsoleProps): JSX.Element {
  return (
    <div class={classes(props.className, "flex flex-col")}>
      <div class="bg-secondary p-2 text-center relative">
        <button
          class={classes(
            "absolute left-2",
            "px-2",
            "bg-accent text-secondary",
            "font-bold",
            "cursor-pointer",
            "rounded-md",
          )}
          onClick={() => props.onRunClick()}
        >
          Run
        </button>
        <span>Console</span>
      </div>
      <div class="p-2 grow overflow-auto whitespace-pre">
        <Show when={props.outputGeneratedAt !== null}>
          {`Output at ${props.outputGeneratedAt?.toLocaleString()}\n********************\n${props.output}`}
        </Show>
      </div>
    </div>
  );
}
