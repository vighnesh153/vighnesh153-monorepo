import {
  children,
  type JSX,
  mergeProps,
  type ParentProps,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";

import { classes } from "@/utils/index.ts";

type ButtonProps =
  & ParentProps<{ component: "button" }>
  & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps =
  & ParentProps<{ component: "a" }>
  & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export function BaseButtonStyles(
  incomingProps: ButtonProps | AnchorProps,
): JSX.Element {
  const [local, baseProps] = splitProps(
    mergeProps<(ButtonProps | AnchorProps)[]>(incomingProps),
    [
      "children",
      "class",
      "component",
    ],
  );

  const c = children(() => local.children);
  return (
    // @ts-ignore
    <Dynamic
      {...baseProps}
      component={local.component}
      class={classes(
        local.class,
        `
        py-[0.75em] px-[2em]
        inline-block

        border-none

        rounded-xl
        transition-shadow
        duration-200
        ease-in-out
        text-base
        text-center
        cursor-pointer
        uppercase

        hover:shadow-2xl hover:shadow-primary
        focus-visible:shadow-2xl focus-visible:shadow-primary
      `,
      )}
    >
      {c()}
    </Dynamic>
  );
}
