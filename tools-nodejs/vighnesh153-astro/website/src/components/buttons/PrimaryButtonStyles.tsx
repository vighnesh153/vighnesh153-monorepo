import {
  children,
  type JSX,
  mergeProps,
  type ParentProps,
  splitProps,
} from "solid-js";

import { classes } from "@/utils/index.ts";
import { BaseButtonStyles } from "./BaseButtonStyles";

type ButtonProps =
  & ParentProps<{ component: "button" }>
  & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps =
  & ParentProps<{ component: "a" }>
  & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export function PrimaryButtonStyles(
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
    <BaseButtonStyles
      {...baseProps}
      component={local.component!}
      class={classes(
        local.class,
        `
        bg-primary
        text-secondary
      `,
      )}
    >
      {c()}
    </BaseButtonStyles>
  );
}
