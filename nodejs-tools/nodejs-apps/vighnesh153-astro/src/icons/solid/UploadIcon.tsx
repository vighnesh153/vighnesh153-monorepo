/* eslint-disable max-len */
import { type JSX, splitProps } from "solid-js";

export type UploadIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export function UploadIcon(incomingProps: UploadIconProps): JSX.Element {
  const [, props] = splitProps(incomingProps, ["viewBox", "xmlns"]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z">
      </path>
    </svg>
  );
}
