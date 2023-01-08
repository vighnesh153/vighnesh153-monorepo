import React from 'react';
import { alpha, Box, List, Typography, useTheme } from '@mui/material';
import { HomePageSectionTitle } from './section-title';
import { homeModuleConstants } from '../constants';
import { SectionListItem } from './section-list-item';

const aboutMeSection = homeModuleConstants.sections.aboutMe;

export function AboutMeSection() {
  const theme = useTheme();
  const textColor = alpha(theme.palette.text.primary, 0.65);
  return (
    <Box className="about-me" component="section" sx={{ py: 12.5 }}>
      <HomePageSectionTitle count={aboutMeSection.count} title={aboutMeSection.title} />
      <Box className="about-me-summary" sx={{ mt: 6 }}>
        <Typography color={textColor}>
          {aboutMeSection.summary}
          <br />
          <Typography component="span" color={textColor} sx={{ display: 'inline-block', mt: 4 }}>
            {aboutMeSection.subSummary}
          </Typography>
        </Typography>
        <List sx={{ mt: 2 }}>
          {aboutMeSection.technologies.map((technology) => (
            <SectionListItem>
              <Typography component="span" color={textColor}>
                {technology}
              </Typography>
            </SectionListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
