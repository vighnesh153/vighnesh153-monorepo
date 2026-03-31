import type { JSX, SVGAttributes } from "react";

export type CloseIconProps = SVGAttributes<SVGSVGElement>;

export function CloseIcon({
  viewBox: _viewBox,
  xmlns: _xmlns,
  ...props
}: CloseIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      stroke="currentColor"
      strokeWidth="15"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path className="top" d="M10,10 L90,90"></path>
      <path className="bottom" d="M10,90 L90,10"></path>
    </svg>
  );
}
