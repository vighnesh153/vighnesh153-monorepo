'use client';

import { useTheme } from '@mui/material';
import { MuiNextLink } from './MuiNextLink';

export function SkipToMainContent() {
  const theme = useTheme();

  return (
    <MuiNextLink
      variant="button"
      href="#main"
      sx={{
        padding: '1em 2em',
        position: 'fixed',
        left: 10,
        top: -100,
        display: 'inline-block',

        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightBold,

        borderRadius: 2.5,
        outline: 'none',
        zIndex: theme.zIndex.appBar + theme.zIndex.drawer,

        '&:focus': {
          top: 10,
        },
      }}
    >
      Skip to main content
    </MuiNextLink>
  );
}
