import type { JSX } from "solid-js";

import { classes } from "@/utils";

export type ResumeSectionHeadingProps = {
  text: JSX.Element;
  class?: string;
};

export function ResumeSectionTitle(
  props: ResumeSectionHeadingProps,
): JSX.Element {
  return (
    <h2 class={classes(props.class, `uppercase text-xl`)}>
      {props.text}
    </h2>
  );
}

export function ResumeSectionSubtitle(
  props: ResumeSectionHeadingProps,
): JSX.Element {
  return (
    <h3
      class={classes(
        props.class,
        `uppercase text-base font-bold`,
      )}
    >
      {props.text}
    </h3>
  );
}
