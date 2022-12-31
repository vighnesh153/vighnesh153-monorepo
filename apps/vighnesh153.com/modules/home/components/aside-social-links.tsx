import React from 'react';
import { Box, useTheme, Tooltip } from '@mui/material';
import { CommonComponents, commonConstants } from '@modules/common';

export function AsideSocialLinks() {
  const theme = useTheme();
  return (
    <CommonComponents.FocusDashedOutline>
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
          gap: '1rem',

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
              <CommonComponents.MuiNextLink
                href={profile.link}
                aria-label={`Link to ${profile.title}`}
                sx={{
                  fontSize: 0,
                  color: theme.palette.text.primary,
                  '&:is(:hover, :focus)': {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <profile.Icon size="1.25rem" />
              </CommonComponents.MuiNextLink>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </CommonComponents.FocusDashedOutline>
  );
}
