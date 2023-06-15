'use client';

import { useMemo } from 'react';

import { alpha, useTheme } from '@mui/material';

import { MuiNextLink, MuiNextLinkProps } from './MuiNextLink';

export type BorderCornerAnimationLinkProps = MuiNextLinkProps;

const linkLength = '15px';
const linkWidth = '2px';
const linkBorder = 'linear-gradient(currentColor 0%, currentColor 0%)';

const baseBgImage = [linkBorder, linkBorder, linkBorder, linkBorder].join(', ');
const baseBgSize = [
  `${linkLength} ${linkWidth}`,
  `${linkWidth} ${linkLength}`,
  `${linkWidth} ${linkLength}`,
  `${linkLength} ${linkWidth}`,
].join(', ');

export function BorderCornerAnimationLink(props: BorderCornerAnimationLinkProps) {
  const theme = useTheme();

  const animationTransition = useMemo(
    () => `background-position ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    [theme]
  );

  const onHoverBgColor = useMemo(() => alpha(theme.palette.secondary.main, 0.05), [theme]);

  return (
    <MuiNextLink
      {...props}
      color="secondary"
      sx={{
        ...props.sx,

        py: '1rem',
        px: '1.5rem',

        backgroundImage: baseBgImage,
        backgroundSize: baseBgSize,
        backgroundPosition: '100% 0, 100% 0, 0 100%, 0 100%',
        backgroundRepeat: 'no-repeat',

        textDecoration: 'none',

        '@media (prefers-reduced-motion: no-preference)': {
          transition: animationTransition,
        },

        ':hover': {
          backgroundColor: onHoverBgColor,
          backgroundPosition: '0 0, 100% 100%, 0 0, 100% 100%',
        },
      }}
    />
  );
}
