import {
  children,
  type JSX,
  Match,
  mergeProps,
  type ParentProps,
  splitProps,
  Switch,
} from "solid-js";
import { classes } from "@/utils";

import { SecondaryButtonStyles } from "./buttons/SecondaryButtonStyles";
import { PrimaryButtonStyles } from "./buttons/PrimaryButtonStyles";

export type LinkProps =
  & ParentProps<{
    linkType?: "regular" | "primary-btn" | "secondary-btn";
  }>
  & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link(incomingProps: LinkProps) {
  const [localProps, other] = splitProps(
    mergeProps<LinkProps[]>({ linkType: "regular" }, incomingProps),
    ["href", "class", "linkType", "children"],
  );
  const c = children(() => localProps.children);

  return (
    <Switch>
      <Match when={localProps.linkType === "regular"}>
        <a
          {...other}
          href={localProps.href}
          class={classes(localProps.class, "regular-link")}
        >
          {c()}
        </a>
      </Match>
      <Match when={localProps.linkType === "primary-btn"}>
        <PrimaryButtonStyles
          {...other}
          href={localProps.href}
          class={classes(localProps.class)}
          component="a"
        >
          {c()}
        </PrimaryButtonStyles>
      </Match>
      <Match when={localProps.linkType === "secondary-btn"}>
        <SecondaryButtonStyles
          {...other}
          href={localProps.href}
          class={classes(localProps.class)}
          component="a"
        >
          {c()}
        </SecondaryButtonStyles>
      </Match>
    </Switch>
  );
}
