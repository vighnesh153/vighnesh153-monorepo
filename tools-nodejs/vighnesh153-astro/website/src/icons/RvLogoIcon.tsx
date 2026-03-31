import type { CSSProperties, JSX, SVGAttributes } from "react";

export type RvLogoIconProps = {
  textStyle?: CSSProperties;
} & SVGAttributes<SVGSVGElement>;

export function RvLogoIcon({
  viewBox: _viewBox,
  xmlns: _xmlns,
  textStyle,
  ...props
}: RvLogoIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -5 210 210"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon
        points="100,2 2,50 2,150 100,198 198,150 198,50 100,2"
        fill="transparent"
      >
      </polygon>
      <text
        x="45"
        y="135"
        strokeWidth="2"
        fill="currentColor"
        style={{
          color: "currentColor",
          fontSize: "80px",
          ...textStyle,
        }}
      >
        RV
      </text>
    </svg>
  );
}
