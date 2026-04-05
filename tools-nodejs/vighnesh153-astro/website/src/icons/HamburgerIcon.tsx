import type { JSX, SVGAttributes } from "react";

export type HamburgerIconProps = SVGAttributes<SVGSVGElement>;

export function HamburgerIcon({
  viewBox: _viewBox,
  xmlns: _xmlns,
  ...props
}: HamburgerIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 140 100"
      stroke="currentColor"
      stroke-width="15"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path className="top" d="M20,20 L120,20"></path>
      <path className="middle" d="M20,50 L120,50"></path>
      <path className="bottom" d="M20,80 L120,80"></path>
    </svg>
  );
}
