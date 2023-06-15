'use client';

import { useMemo } from 'react';
import { useTheme } from '@mui/material';

import { MuiNextLink, MuiNextLinkProps } from './MuiNextLink';

export type UnderlinedAnimationLinkProps = MuiNextLinkProps;

export function UnderlinedAnimationLink(props: UnderlinedAnimationLinkProps) {
  const theme = useTheme();

  const animationTransition = useMemo(
    () => `right ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    [theme]
  );

  return (
    <MuiNextLink
      {...props}
      color="secondary"
      sx={{
        ...props.sx,
        display: 'inline-block',
        position: 'relative',
        whiteSpace: 'nowrap',
        textDecoration: 'none',

        '::after': {
          content: '""',

          height: '1px',
          position: 'absolute',
          left: 0,
          right: '100%',
          bottom: -2,

          backgroundColor: 'currentColor',

          '@media (prefers-reduced-motion: no-preference)': {
            transition: animationTransition,
          },
        },

        ':hover::after': {
          right: 0,
        },
      }}
    />
  );
}
