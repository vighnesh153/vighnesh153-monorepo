'use client';

import { lazy, Suspense } from 'react';
import { useTheme } from '@mui/material';

import { commonModuleConstants } from '@/ui-modules/common/constants';

import { FocusDashedOutline } from './FocusDashedOutline';
import { MuiNextLink } from './MuiNextLink';

const Tooltip = lazy(() => import('@mui/material/Tooltip'));

export function AsideEmailAddress() {
  const theme = useTheme();

  const link = (
    <MuiNextLink
      href={`mailto:${commonModuleConstants.email.personal.secondary}`}
      aria-label={`email me @ ${commonModuleConstants.email.personal.secondary}`}
      style={{
        marginBottom: theme.spacing(2.5),

        display: 'inline-block',
        writingMode: 'vertical-lr',

        color: theme.palette.text.primary,
      }}
      sx={{
        '&:is(:hover, :focus)': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      {commonModuleConstants.email.personal.secondary}
    </MuiNextLink>
  );

  return (
    <FocusDashedOutline
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 'auto',
        right: '1.5rem',

        listStyle: 'none',

        display: {
          xs: 'none',
          sm: 'block',
        },

        '&:after': {
          content: '""',
          width: '1px',
          height: 90,
          margin: '0 auto',

          display: 'block',

          backgroundColor: theme.palette.text.primary,
        },
      }}
    >
      <Suspense fallback={link}>
        <Tooltip title="Email me" placement="left">
          {link}
        </Tooltip>
      </Suspense>
    </FocusDashedOutline>
  );
}
