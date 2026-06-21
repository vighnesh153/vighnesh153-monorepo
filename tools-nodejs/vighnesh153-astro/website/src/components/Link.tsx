import {
  type AnchorHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from "react";

import styles from "./buttons/Button.module.scss";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  linkType?: "regular" | "primary-btn" | "secondary-btn";
}

export function Link(
  { linkType = "regular", className, ...props }: PropsWithChildren<
    LinkProps
  >,
): ReactNode {
  const computedClassName = useMemo(() => {
    const classes = [className];
    if (linkType == "primary-btn") {
      classes.push(styles.btn, styles["btn-primary"]);
    }
    if (linkType == "secondary-btn") {
      classes.push(styles.btn, styles["btn-secondary"]);
    }
    return classes.join(" ");
  }, [linkType]);

  return (
    <a
      {...props}
      className={computedClassName}
    />
  );
}
