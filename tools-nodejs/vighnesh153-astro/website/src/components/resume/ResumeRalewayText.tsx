import type { JSX } from "solid-js";

import { classes } from "@/utils";

export function ResumeRalewayText(
  props: { class?: string; children: JSX.Element },
) {
  return (
    <span
      class={classes(props.class)}
      style={{
        "font-family": "'Raleway Variable', sans-serif",
      }}
    >
      {props.children}
    </span>
  );
}
