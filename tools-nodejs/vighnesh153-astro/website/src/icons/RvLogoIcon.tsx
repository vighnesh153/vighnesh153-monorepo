import { type JSX, splitProps } from "solid-js";
import type * as CSS from "csstype";

export type RvLogoIconProps = {
  textStyle?: CSS.Properties<string | number>;
} & JSX.SvgSVGAttributes<SVGSVGElement>;

export function RvLogoIcon(incomingProps: RvLogoIconProps): JSX.Element {
  const [local, props] = splitProps(incomingProps, [
    "viewBox",
    "xmlns",
    "textStyle",
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -5 210 210"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
      stroke-linejoin="round"
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
        stroke-width="2"
        fill="currentColor"
        style={{
          color: "currentColor",
          "font-size": "80px",
          ...(local.textStyle as any),
        }}
      >
        RV
      </text>
    </svg>
  );
}
