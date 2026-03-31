import type { JSX } from "react";
import { classes } from "@/utils/classes.ts";

export type ResumeLinkProps = {
  href: string;
  text: string;
  className?: string;
};

export function ResumeLink(props: ResumeLinkProps): JSX.Element {
  return (
    <a className={classes(props.className)} href={props.href}>
      {props.text}
    </a>
  );
}
