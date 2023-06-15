import { alpha, Box, List, ListItem, Typography, useTheme } from '@mui/material';
import { FocusDashedOutline, UnderlinedAnimationLink } from '@/modules/common';
import { SectionListItem } from '@/modules/home/components/section-list-item';
import { homeModuleConstants } from '@/modules/home/constants';
import { HomePageSectionTitle } from '../section-title';

const experienceSection = homeModuleConstants.sections.experience;

export function ExperienceSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <Box id="experience" className="experience" component="section" sx={{ py: 12.5 }}>
      <HomePageSectionTitle count={experienceSection.count} title={experienceSection.title} />
      <FocusDashedOutline>
        <List sx={{ mt: 3 }}>
          {experienceSection.companies.map((company) => (
            <ListItem
              key={company.companyName}
              sx={{
                mb: 5,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography component="h3" variant="h6" aria-label={company.companyName}>
                <UnderlinedAnimationLink href={company.companyUrl} color="secondary">
                  @{company.companyName}
                </UnderlinedAnimationLink>
              </Typography>
              {company.positions.length > 1 && (
                <Typography variant="subtitle2" color={textColor}>
                  Full time · {company.totalDuration}
                </Typography>
              )}
              <List aria-label="Positions at the company">
                {company.positions.map((position) => (
                  <ListItem
                    disableGutters
                    disablePadding
                    key={position.title}
                    sx={{
                      pb: 0.5,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={alpha(theme.palette.text.primary, 0.9)}
                      aria-label={`Position: ${position.title}`}
                    >
                      {position.title}
                    </Typography>
                    <Typography variant="subtitle2" color={textColor} sx={{ mt: -0.8 }}>
                      {position.duration}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <List aria-label="Responsibilities at the company">
                {company.responsibilities.map((responsibility, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SectionListItem key={index}>
                    <Typography component="span" color={textColor}>
                      {responsibility}
                    </Typography>
                  </SectionListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </FocusDashedOutline>
    </Box>
  );
}
