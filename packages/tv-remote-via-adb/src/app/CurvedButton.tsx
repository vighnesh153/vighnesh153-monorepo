'use client';

import { Box, BoxProps } from '@mui/material';
import { theme } from '@vighnesh153/react-ui';

interface CurvedButtonProps extends BoxProps {}

export function CurvedButton({ ...props }: CurvedButtonProps) {
  return (
    <Box
      component="svg"
      role="button"
      tabIndex={0}
      width="200px"
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        '.shape': {
          strokeWidth: 2,
          stroke: 'transparent',
          fill: theme.palette.secondary.main,
          transition: 'fill 200ms',
          ':hover': {
            stroke: theme.palette.secondary.main,
            fill: theme.palette.primary.light,
          },
        },
        ':has(.caret:hover) .shape': {
          stroke: theme.palette.secondary.main,
          fill: theme.palette.primary.light,
        },
        '.caret': {
          stroke: theme.palette.primary.main,
          ':hover': {
            stroke: theme.palette.secondary.main,
          },
        },
        '.shape:hover + .caret': {
          stroke: theme.palette.secondary.main,
        },
      }}
      {...props}
    >
      <path
        className="shape"
        d="
          M 0,50 
          Q 100,-50 200,50
          L 150,100
          Q 100,50 50,100
          Z"
      />
      <path
        className="caret"
        strokeWidth="4"
        fill="transparent"
        d="
        M 90,45
        L 100,35
        L 110,45
      "
      />
    </Box>
  );
}
