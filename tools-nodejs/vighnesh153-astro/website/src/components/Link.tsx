import {
  type AnchorHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { classes } from "@/utils/classes.ts";

import {
  getPrimaryButtonClasses,
  getSecondaryButtonClasses,
} from "./buttons/Button.tsx";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  linkType?: "regular" | "primary-btn" | "secondary-btn";
}

export function Link(
  { linkType = "regular", className, ...props }: PropsWithChildren<
    LinkProps
  >,
): ReactNode {
  if (linkType == "regular") {
    return (
      <a
        {...props}
        className={classes(className, "regular-link")}
      />
    );
  }

  if (linkType == "primary-btn") {
    return (
      <a
        {...props}
        className={classes(className, getPrimaryButtonClasses())}
      />
    );
  }

  if (linkType == "secondary-btn") {
    return (
      <a
        {...props}
        className={classes(className, getSecondaryButtonClasses())}
      />
    );
  }

  return null;
}
