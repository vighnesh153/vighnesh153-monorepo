/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import React, { CSSProperties } from 'react';

export interface RVLogoIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'as' | 'ref'> {
  textStyle?: CSSProperties;
}

export function RVLogoIcon({ textStyle, ...props }: RVLogoIconProps) {
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
      <title>Logo</title>
      <polygon points="100,2 2,50 2,150 100,198 198,150 198,50 100,2" fill="transparent" />
      <text
        x="45"
        y="135"
        strokeWidth="2"
        fill="currentColor"
        style={{ color: 'currentColor', fontSize: 88, ...textStyle }}
      >
        RV
      </text>
    </svg>
  );
}
