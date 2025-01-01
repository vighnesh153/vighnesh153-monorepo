import type { JSX } from "solid-js";

export type ResumeLinkProps = {
  href: string;
  text: string;
};

export function ResumeLink(props: ResumeLinkProps): JSX.Element {
  return <a class="text-[royalblue]" href={props.href}>{props.text}</a>;
}
