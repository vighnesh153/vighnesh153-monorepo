'use client';

import { Box, Typography, useTheme } from '@mui/material';

import { FocusDashedOutline, MuiNextLink, SocialLinks } from '@/ui-modules/common/components';
import { commonModuleConstants } from '@/ui-modules/common/constants';

export function FooterSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <FocusDashedOutline
      id="footer"
      className="footer"
      component="footer"
      sx={{ mt: 15, mb: 5, display: 'grid', placeItems: 'center' }}
    >
      <Box
        component="ul"
        sx={{
          mb: 2,

          display: {
            xs: 'flex',
            sm: 'none',
          },
          gap: '1.5rem',

          fontSize: 0,
          listStyle: 'none',
        }}
      >
        <SocialLinks placement="top" />
      </Box>

      <Typography variant="subtitle2" color={textColor} textAlign="center" sx={{ maxWidth: 200 }}>
        <MuiNextLink href={commonModuleConstants.externalLinks.selfGithubLink} color="secondary">
          View on Github
        </MuiNextLink>
      </Typography>
    </FocusDashedOutline>
  );
}
