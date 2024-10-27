"use client";

import { Box, BoxProps } from "@mui/material";

import { CurvedButton } from "./CurvedButton.tsx";
import { CenterButton } from "./CenterButton.tsx";

export interface DPadProps extends BoxProps {
  onLeftClick: () => void;
  onRightClick: () => void;
  onUpClick: () => void;
  onDownClick: () => void;
  onCenterClick: () => void;
}

export function DPad(
  {
    onLeftClick,
    onRightClick,
    onUpClick,
    onDownClick,
    onCenterClick,
    ...props
  }: DPadProps,
) {
  const upButton = (
    <Box sx={{ position: "absolute", left: 55 }}>
      <CurvedButton onClick={onUpClick} />
    </Box>
  );
  const rightButton = (
    <Box sx={{ position: "absolute", top: 100, left: 155, rotate: "90deg" }}>
      <CurvedButton onClick={onRightClick} />
    </Box>
  );
  const downButton = (
    <Box sx={{ position: "absolute", top: 200, left: 55, rotate: "180deg" }}>
      <CurvedButton onClick={onDownClick} />
    </Box>
  );
  const leftButton = (
    <Box sx={{ position: "absolute", top: 100, left: -45, rotate: "270deg" }}>
      <CurvedButton onClick={onLeftClick} />
    </Box>
  );
  const centerButton = (
    <Box sx={{ position: "absolute", top: 92, left: 94, rotate: "45deg" }}>
      <CenterButton onClick={onCenterClick} />
    </Box>
  );

  return (
    <Box
      {...props}
      sx={{
        width: 310,
        aspectRatio: 1,
        position: "relative",
        ...props.sx,
        '[role="button"]': {
          outline: "none",
          cursor: "pointer",
        },
      }}
    >
      {upButton}
      {rightButton}
      {downButton}
      {leftButton}
      {centerButton}
    </Box>
  );
}
