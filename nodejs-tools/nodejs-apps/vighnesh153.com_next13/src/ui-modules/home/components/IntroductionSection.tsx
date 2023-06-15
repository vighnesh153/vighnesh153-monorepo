'use client';

import { alpha, Box, Typography, useTheme } from '@mui/material';

import { BorderCornerAnimationLink, FocusDashedOutline } from '@/ui-modules/common/components';
import { commonModuleConstants } from '@/ui-modules/common/constants';

export function IntroductionSection() {
  const theme = useTheme();

  return (
    <Box
      className="hero"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <FocusDashedOutline>
        <Typography component="h1">
          <Typography
            component="span"
            variant="h6"
            color={theme.palette.secondary.main}
            sx={{
              mb: '0.5rem',
              display: 'block',
            }}
          >
            Hi, my name is
          </Typography>
          <Typography
            component="span"
            variant="h2"
            color={theme.palette.text.primary}
            sx={{
              mb: '0.5rem',
              display: 'block',
              fontWeight: 'bold !important',
              typography: {
                xs: 'h4',
                sm: 'h3',
                md: 'h2',
              },
            }}
          >
            Vighnesh Raut.
          </Typography>
          <Typography
            component="span"
            variant="h2"
            color={alpha(theme.palette.text.primary, 0.5)}
            sx={{
              mb: '1.5rem',
              display: 'block',
              fontWeight: 'bold !important',
              typography: {
                xs: 'h4',
                sm: 'h3',
                md: 'h2',
              },
            }}
          >
            I build things, mostly for the web.
          </Typography>
        </Typography>
        <Typography
          component="p"
          color={alpha(theme.palette.text.primary, 0.6)}
          sx={{
            display: 'block',
            typography: {
              xs: 'body1',
              sm: 'h6',
            },
          }}
        >
          I am a Software Engineer specializing in building exceptional digital experiences. Currently, I’m focused on
          building accessible, human-centered products for different causes.
        </Typography>
        <Box sx={{ mt: 5 }}>
          <BorderCornerAnimationLink href={commonModuleConstants.internalLinks.homePage.contactMeSection}>
            Get in Touch
          </BorderCornerAnimationLink>
        </Box>
      </FocusDashedOutline>
    </Box>
  );
}
