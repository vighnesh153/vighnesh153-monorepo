import type { JSX, PropsWithChildren } from "react";

import { classes } from "@/utils/classes.ts";

export function ResumeRalewayText(
  props: PropsWithChildren<{ className?: string }>,
): JSX.Element {
  return (
    <span
      className={classes(props.className)}
      style={{
        fontFamily: "'Raleway Variable', sans-serif",
      }}
    >
      {props.children}
    </span>
  );
}
