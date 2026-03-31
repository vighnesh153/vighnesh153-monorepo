import type { JSX, SVGAttributes } from "react";

export type FileIconProps = SVGAttributes<SVGSVGElement>;

export function FileIcon({
  viewBox: _viewBox,
  xmlns: _xmlns,
  stroke: _stroke,
  fill: _fill,
  strokeLinecap: _strokeLinecap,
  strokeLinejoin: _strokeLinejoin,
  ...props
}: FileIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z">
      </path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );
}
