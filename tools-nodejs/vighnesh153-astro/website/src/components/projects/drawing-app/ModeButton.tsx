import { type JSX, type PropsWithChildren } from "react";
import { classes } from "@/utils/classes.ts";

export type ModeButtonProps = PropsWithChildren<{
  isSelected?: boolean;
  title?: string;
  onClick?: () => void;
}>;

export function ModeButton({
  isSelected = false,
  title,
  children,
  onClick,
}: ModeButtonProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <button
        className={classes(
          `p-2 rounded-full focus-visible:outline-secondary`,
          isSelected &&
            "outline-offset-4 outline-2 outline-secondary fill-text bg-secondary",
        )}
        onClick={onClick}
      >
        {children}
      </button>
      {title && (
        <div
          className={classes(
            "mt-2 text-secondary",
            isSelected && "font-bold underline",
          )}
        >
          {title}
        </div>
      )}
    </div>
  );
}
