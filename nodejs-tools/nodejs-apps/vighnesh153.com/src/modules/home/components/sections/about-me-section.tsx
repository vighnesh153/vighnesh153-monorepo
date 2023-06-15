import { Box, List, Typography, useTheme } from '@mui/material';
import { FocusDashedOutline } from '@/modules/common';
import { homeModuleConstants } from '@/modules/home/constants';
import { HomePageSectionTitle } from '../section-title';
import { SectionListItem } from '../section-list-item';

const aboutMeSection = homeModuleConstants.sections.aboutMe;

export function AboutMeSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <Box id="about" className="about-me" component="section" sx={{ py: 12.5 }}>
      <HomePageSectionTitle count={aboutMeSection.count} title={aboutMeSection.title} />
      <FocusDashedOutline className="about-me-summary" sx={{ mt: 6 }}>
        <Typography color={textColor}>
          {aboutMeSection.summary}
          <br />
          <Typography component="span" color={textColor} sx={{ display: 'inline-block', mt: 4 }}>
            {aboutMeSection.subSummary}
          </Typography>
        </Typography>

        <List sx={{ mt: 2 }}>
          {aboutMeSection.technologies.map((technology) => (
            <SectionListItem key={technology}>
              <Typography component="span" color={textColor}>
                {technology}
              </Typography>
            </SectionListItem>
          ))}
        </List>
      </FocusDashedOutline>
    </Box>
  );
}
