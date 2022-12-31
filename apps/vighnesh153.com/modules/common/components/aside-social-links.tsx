import React from 'react';
import { Box, useTheme, Tooltip } from '@mui/material';
import { commonConstants } from '../constants';
import { FocusDashedOutline } from './focus-dashed-outline';
import { MuiNextLink } from './next-link';

export function AsideSocialLinks() {
  const theme = useTheme();
  return (
    <FocusDashedOutline>
      <Box
        component="ul"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '1.5rem',
          right: 'auto',

          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexDirection: 'column',
          gap: '1.5rem',

          fontSize: 0,
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
        {commonConstants.profiles.map((profile) => (
          <Box component="li" key={profile.identifier}>
            <Tooltip title={profile.title} placement="right">
              <MuiNextLink
                href={profile.link}
                aria-label={`Link to ${profile.title}`}
                sx={{
                  display: 'inline-block',

                  fontSize: 0,
                  color: theme.palette.text.primary,
                  '&:is(:hover, :focus)': {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <profile.Icon size="1.25rem" />
              </MuiNextLink>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </FocusDashedOutline>
  );
}
