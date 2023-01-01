import { Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { FocusDashedOutline } from './focus-dashed-outline';
import { MuiNextLink } from './next-link';
import { commonConstants } from '../constants';

export function AsideEmailAddress() {
  const theme = useTheme();

  return (
    <FocusDashedOutline
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 'auto',
        right: '1.5rem',

        listStyle: 'none',

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
      <Tooltip title="Email me" placement="left">
        <MuiNextLink
          href={`mailto:${commonConstants.email.personal.secondary}`}
          aria-label={`email me @ ${commonConstants.email.personal.secondary}`}
          sx={{
            mb: 2.5,

            display: 'inline-block',
            writingMode: 'vertical-lr',

            color: theme.palette.text.primary,
            '&:is(:hover, :focus)': {
              color: theme.palette.secondary.main,
            },
          }}
        >
          {commonConstants.email.personal.secondary}
        </MuiNextLink>
      </Tooltip>
    </FocusDashedOutline>
  );
}
