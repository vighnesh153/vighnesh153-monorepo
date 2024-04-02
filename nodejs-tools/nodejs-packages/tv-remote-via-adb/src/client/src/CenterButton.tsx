'use client';

import { CSSProperties } from 'react';
import { Box, BoxProps } from '@mui/material';
import { theme } from './theme';

export interface CenterButtonProps extends BoxProps {
  buttonColor?: CSSProperties['color'];
}

export function CenterButton({ buttonColor = theme.palette.secondary.main, ...props }: CenterButtonProps) {
  return (
    <Box
      role="button"
      tabIndex={0}
      className="center-button"
      sx={{
        width: 125,
        aspectRatio: 1,
        borderRadius: 14,
        backgroundColor: buttonColor,
        border: `2px solid transparent`,
        transition: 'backgroundColor 200ms',
        ':hover': {
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.secondary.main,
        },
      }}
      {...props}
    />
  );
}
