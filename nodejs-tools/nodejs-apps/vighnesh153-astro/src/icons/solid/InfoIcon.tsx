/* eslint-disable max-len */
import { type JSX, splitProps } from "solid-js";

export type InfoIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export function InfoIcon(incomingProps: InfoIconProps): JSX.Element {
  const [, props] = splitProps(incomingProps, ["viewBox", "xmlns"]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path d="M7 4.75c0-0.412 0.338-0.75 0.75-0.75h0.5c0.412 0 0.75 0.338 0.75 0.75v0.5c0 0.412-0.338 0.75-0.75 0.75h-0.5c-0.412 0-0.75-0.338-0.75-0.75v-0.5z">
      </path>
      <path d="M10 12h-4v-1h1v-3h-1v-1h3v4h1z"></path>
      <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z">
      </path>
    </svg>
  );
}
