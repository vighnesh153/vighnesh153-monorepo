import React from 'react';
import { Link, useTheme } from '@vighnesh153/ui';

export function SkipToMainContent() {
  const theme = useTheme();

  return (
    <Link
      variant="button"
      href="#main"
      sx={{
        padding: '1em 2em',
        position: 'fixed',
        left: 10,
        top: -100,
        display: 'inline-block',

        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
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
    </Link>
  );
}
