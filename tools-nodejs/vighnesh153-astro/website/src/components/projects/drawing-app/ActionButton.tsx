import { type ButtonHTMLAttributes, type JSX } from "react";
import { not } from "@vighnesh153/tools";
import { classes } from "@/utils/classes.ts";

export type ActionButtonProps = {
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  title,
  children,
  ...props
}: ActionButtonProps): JSX.Element {
  const disabled = props.disabled;

  return (
    <div className="flex flex-col">
      <button
        {...props}
        className={classes(
          "w-[40px] aspect-square rounded-full grid place-items-center border-2",
          "focus-visible:outline-secondary",
          disabled &&
            "cursor-not-allowed stroke-[#aeaeae] fill-[#aeaeae] border-[#aeaeae]",
          not(disabled) &&
            "stroke-secondary fill-secondary border-secondary",
        )}
      >
        {children}
      </button>
      <div className="mt-2 text-secondary">
        {title ?? "Title"}
      </div>
    </div>
  );
}
