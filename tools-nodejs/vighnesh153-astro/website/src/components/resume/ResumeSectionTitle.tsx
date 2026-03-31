import type { JSX, ReactNode } from "react";

import { classes } from "@/utils/classes.ts";

export type ResumeSectionHeadingProps = {
  text: ReactNode;
  className?: string;
};

export function ResumeSectionTitle(
  props: ResumeSectionHeadingProps,
): JSX.Element {
  return (
    <h2 className={classes(props.className, `uppercase text-xl`)}>
      {props.text}
    </h2>
  );
}

export function ResumeSectionSubtitle(
  props: ResumeSectionHeadingProps,
): JSX.Element {
  return (
    <h3
      className={classes(
        props.className,
        `uppercase text-base font-bold`,
      )}
    >
      {props.text}
    </h3>
  );
}
