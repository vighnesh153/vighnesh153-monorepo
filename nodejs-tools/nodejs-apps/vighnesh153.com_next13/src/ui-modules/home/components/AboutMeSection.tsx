'use client';

import { Box, List, Typography, useTheme } from '@mui/material';

import { FocusDashedOutline, UnderlinedAnimationLink } from '@/ui-modules/common/components';
import { commonModuleConstants } from '@/ui-modules/common/constants';

import { HomePageSectionTitle } from './HomePageSectionTitle';
import { HomePageSectionListItem } from './HomePageSectionListItem';

const typographySx = {
  xs: 'body1',
  sm: 'h6',
};

export function AboutMeSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;

  return (
    <Box id="about" className="about-me" component="section" sx={{ py: 12.5 }}>
      <HomePageSectionTitle count="01" title="About me" />
      <FocusDashedOutline className="about-me-summary" sx={{ mt: 6 }}>
        <Typography color={textColor} sx={{ typography: typographySx }}>
          Hello. My name is Vighnesh and I enjoy creating things that live mostly on the web. My interest in software
          development started a few years back when I first learnt about Javascript. Since then, I have been building
          teeny-tiny projects for the web and cli for fun.
          <br />
          <br />
          Fast-forward to today, and I have had the privilege to work for{' '}
          <UnderlinedAnimationLink href={commonModuleConstants.externalLinks.google} target="_blank">
            Google
          </UnderlinedAnimationLink>
          ,{' '}
          <UnderlinedAnimationLink href={commonModuleConstants.externalLinks.amazon} target="_blank">
            Amazon
          </UnderlinedAnimationLink>
          ,{' '}
          <UnderlinedAnimationLink href={commonModuleConstants.externalLinks.smarterCodes} target="_blank">
            an AI startup
          </UnderlinedAnimationLink>{' '}
          and{' '}
          <UnderlinedAnimationLink href={commonModuleConstants.externalLinks.tavisca} target="_blank">
            a loyalty rewards company
          </UnderlinedAnimationLink>
          .
          <br />
          <br />
          My Main focus these days is building next-gen developer tools for GoogleTV at{' '}
          <UnderlinedAnimationLink href={commonModuleConstants.externalLinks.google} target="_blank">
            Google
          </UnderlinedAnimationLink>
          .
          <br />
          <Typography
            component="span"
            color={textColor}
            sx={{
              mt: 4,
              display: 'inline-block',
              typography: typographySx,
            }}
          >
            Here are a few technologies I have been working with recently:
          </Typography>
        </Typography>

        <List sx={{ mt: 2 }}>
          {commonModuleConstants.currentTechnologies.map((technology) => (
            <HomePageSectionListItem key={technology}>
              <Typography component="span" color={textColor} sx={{ typography: typographySx }}>
                {technology}
              </Typography>
            </HomePageSectionListItem>
          ))}
        </List>
      </FocusDashedOutline>
    </Box>
  );
}
