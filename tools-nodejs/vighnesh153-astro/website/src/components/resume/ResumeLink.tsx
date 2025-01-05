import type { JSX } from "solid-js";
import { classes } from "@/utils";

export type ResumeLinkProps = {
  href: string;
  text: string;
  class?: string;
};

export function ResumeLink(props: ResumeLinkProps): JSX.Element {
  return (
    <a class={classes(props.class)} href={props.href}>
      {props.text}
    </a>
  );
}
