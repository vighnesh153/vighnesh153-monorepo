import {
  children,
  type JSX,
  mergeProps,
  type ParentProps,
  Show,
} from "solid-js";
import { classes } from "@/utils/index.ts";

export type ModeButtonProps =
  & ParentProps<{
    isSelected?: boolean;
    title?: string;
  }>
  & Pick<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function ModeButton(
  incomingProps: ModeButtonProps,
): JSX.Element {
  const props = mergeProps<ModeButtonProps[]>(
    { isSelected: false },
    incomingProps,
  );
  const safeChildren = children(() => props.children);

  return (
    <div class="flex flex-col">
      <button
        class={classes(`p-2 rounded-full focus-visible:outline-secondary`)}
        classList={{
          outline: props.isSelected,
          "outline-offset-4": props.isSelected,
          "outline-2": props.isSelected,
          "outline-secondary": props.isSelected,
          "fill-text": props.isSelected,
          "bg-secondary": props.isSelected,
        }}
        onClick={props.onClick}
      >
        {safeChildren()}
      </button>
      <Show when={props.title}>
        <div
          class="mt-2 text-secondary"
          classList={{
            "font-bold": props.isSelected,
            underline: props.isSelected,
          }}
        >
          {props.title ?? "Title"}
        </div>
      </Show>
    </div>
  );
}
