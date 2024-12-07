import { children, type JSX, type ParentProps } from "solid-js";
import { not } from "@vighnesh153/tools";
import { classes } from "@/utils/index.ts";

export type ActionButtonProps =
  & ParentProps<{
    title: string;
  }>
  & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton(props: ActionButtonProps) {
  const disabled = () => props.disabled;
  const safeChildren = children(() => props.children);

  return (
    <div class="flex flex-col">
      <button
        {...props}
        class={classes(
          "w-[40px] aspect-square rounded-full grid place-items-center border-2",
          "focus-visible:outline-secondary",
        )}
        classList={{
          "cursor-not-allowed": disabled(),
          "stroke-[#aeaeae]": disabled(),
          "fill-[#aeaeae]": disabled(),
          "border-[#aeaeae]": disabled(),
          "stroke-secondary": not(disabled()),
          "fill-secondary": not(disabled()),
          "border-secondary": not(disabled()),
        }}
      >
        {safeChildren()}
      </button>
      <div class="mt-2 text-secondary">
        {props.title ?? "Title"}
      </div>
    </div>
  );
}
