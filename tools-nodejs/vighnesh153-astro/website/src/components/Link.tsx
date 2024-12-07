import {
  children,
  type JSX,
  mergeProps,
  type ParentProps,
  splitProps,
} from "solid-js";
import { classes } from "@/utils";

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
  const safeChildren = children(() => localProps.children);

  return (
    <a
      {...other}
      href={localProps.href}
      class={classes(localProps.class, `${localProps.linkType}-link`)}
    >
      {safeChildren()}
    </a>
  );
}
