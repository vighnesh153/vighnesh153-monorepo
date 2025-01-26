import {
  children,
  type JSX,
  Match,
  mergeProps,
  type ParentProps,
  splitProps,
  Switch,
} from "solid-js";

import { PrimaryButtonStyles } from "./PrimaryButtonStyles";
import { SecondaryButtonStyles } from "./SecondaryButtonStyles";

export type ButtonProps =
  & ParentProps<{
    variant?: "primary" | "secondary";
  }>
  & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(incomingProps: ButtonProps): JSX.Element {
  const [local, buttonProps] = splitProps(
    mergeProps<ButtonProps[]>({ variant: "secondary" }, incomingProps),
    [
      "variant",
      "class",
      "children",
    ],
  );
  const c = children(() => local.children);
  return (
    <Switch>
      <Match when={local.variant === "primary"}>
        <PrimaryButtonStyles
          {...buttonProps}
          component="button"
          class={local.class}
        >
          {c()}
        </PrimaryButtonStyles>
      </Match>
      <Match when={local.variant === "secondary"}>
        <SecondaryButtonStyles
          {...buttonProps}
          component="button"
          class={local.class}
        >
          {c()}
        </SecondaryButtonStyles>
      </Match>
    </Switch>
  );
}
