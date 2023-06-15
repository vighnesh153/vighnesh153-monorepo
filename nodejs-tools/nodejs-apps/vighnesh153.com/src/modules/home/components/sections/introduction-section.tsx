import React from 'react';
import { alpha, Box, Typography, useTheme } from '@mui/material';
import { homeModuleConstants } from '@/modules/home/constants';
import { BorderCornerAnimationLink, commonConstants, FocusDashedOutline } from '@/modules/common';

const introductionSection = homeModuleConstants.sections.introduction;

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
            {introductionSection.caption}
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
            {introductionSection.title}
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
            {introductionSection.subtitle}
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
          {introductionSection.summary}
        </Typography>
        <Box sx={{ mt: 5 }}>
          <BorderCornerAnimationLink href={commonConstants.pageLinks.homePage.contactMeSection}>
            Get in Touch
          </BorderCornerAnimationLink>
        </Box>
      </FocusDashedOutline>
    </Box>
  );
}
