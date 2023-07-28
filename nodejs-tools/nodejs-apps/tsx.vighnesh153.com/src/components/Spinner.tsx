import React from 'react';

export interface SpinnerProps {
  size?: number;
  thickness?: number;
  color?: React.CSSProperties['color'];
  borderStyle?: React.CSSProperties['borderStyle'];
}

export function Spinner({
  size = 30,
  thickness = 3,
  color = 'black',
  borderStyle = 'dashed',
}: SpinnerProps): JSX.Element {
  const border = `${thickness}px ${borderStyle} ${color}`;

  return (
    <div
      role="presentation"
      className="spinner"
      style={{
        width: size,
        height: size,
        borderRight: border,
        borderTop: border,
        borderRadius: '50%',
      }}
    />
  );
}
