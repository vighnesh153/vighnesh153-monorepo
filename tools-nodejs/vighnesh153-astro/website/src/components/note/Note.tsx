import type { JSX, PropsWithChildren } from "react";

import { classes } from "@/utils/classes.ts";
import { CheckIcon, InfoIcon, WarnIcon } from "@/icons";

export type NoteType = "info" | "warn" | "success" | "error";

export type NoteProps = {
  type: NoteType;
  title?: string;
};

export function Note(
  {
    type = "info",
    children,
    title = mappings[type].defaultTitle,
  }: PropsWithChildren<NoteProps>,
): JSX.Element {
  const mapping = mappings[type];
  return (
    <div>
      <div
        className={classes(
          `
          px-3 py-1
          w-fit
          
          rounded-t-lg
          flex items-center gap-2

          text-sm
        `,
          mapping.titleClasses,
        )}
        style={{
          backgroundColor: mapping.majorColor,
        }}
      >
        {mapping.icon()} {title}
      </div>
      <blockquote
        className={classes(`
        py-2 px-4

        block

        rounded-lg
        rounded-tl-none
        border-2

        before:content-[]
      `)}
        style={{
          borderColor: mapping.majorColor,
          backgroundColor: mapping.bgColor,
        }}
      >
        {children}
      </blockquote>
    </div>
  );
}

const mappings = {
  success: {
    icon: () => <CheckIcon className="w-4 h-4" />,
    majorColor: "#388e3c",
    bgColor: "#87d58a30",
    defaultTitle: "Success",
    titleClasses: "text-secondary fill-secondary",
  },
  info: {
    icon: () => <InfoIcon className="w-4 h-4" />,
    majorColor: "#0288d1",
    bgColor: "#7fd7ff30",
    defaultTitle: "Note",
    titleClasses: "text-secondary fill-secondary",
  },
  warn: {
    icon: () => <WarnIcon className="w-4 h-4" />,
    majorColor: "#f57c00",
    bgColor: "#ffd89f30",
    defaultTitle: "Warn",
    titleClasses: "text-secondary fill-secondary",
  },
  error: {
    icon: () => <InfoIcon className="w-4 h-4" />,
    majorColor: "#d32f2f",
    bgColor: "#ffbbbb30",
    defaultTitle: "Error",
    titleClasses: "text-text fill-text",
  },
} satisfies Record<
  NoteType,
  {
    icon: () => JSX.Element;
    majorColor: string;
    bgColor: string;
    defaultTitle: string;
    titleClasses: string;
  }
>;
