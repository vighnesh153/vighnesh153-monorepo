'use client';

import { Box, useTheme } from '@mui/material';
import { FocusDashedOutline } from './FocusDashedOutline';
import { SocialLinks } from './SocialLinks';

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
        <SocialLinks placement="right" />
      </Box>
    </FocusDashedOutline>
  );
}
