import type { JSX } from "react";
import { classes } from "@/utils/classes.ts";

export type CodeConsoleProps = {
  output: string;
  outputGeneratedAt: Date | null;
  className: string;
  onRunClick: () => void;
};

export function CodeConsole(props: CodeConsoleProps): JSX.Element {
  return (
    <div className={classes(props.className, "flex flex-col")}>
      <div className="bg-secondary p-2 text-center relative">
        <button
          className={classes(
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
      <div className="p-2 grow overflow-auto whitespace-pre">
        {props.outputGeneratedAt !== null && (
          `Output at ${props.outputGeneratedAt?.toLocaleString()}\n********************\n${props.output}`
        )}
      </div>
    </div>
  );
}
