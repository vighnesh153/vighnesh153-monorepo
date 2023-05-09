import { alpha, Box, List, ListItem, Typography, useTheme } from '@mui/material';

import { FocusDashedOutline, UnderlinedAnimationLink } from '@/ui-modules/common/components';
import { homePageConstants } from '@/ui-modules/home/constants';

import { HomePageSectionTitle } from './HomePageSectionTitle';
import { HomePageSectionListItem } from './HomePageSectionListItem';

const experienceSection = homePageConstants.experience;

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
              <Typography component="h3" sx={{ typography: { sm: 'h6', md: 'h5' } }} aria-label={company.companyName}>
                <UnderlinedAnimationLink href={company.companyUrl} color="secondary">
                  @{company.companyName}
                </UnderlinedAnimationLink>
              </Typography>
              {company.positions.length > 1 && (
                <Typography variant="subtitle1" color={textColor}>
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
                      sx={{ typography: { sm: 'h6', md: 'h5' } }}
                      color={alpha(theme.palette.text.primary, 0.9)}
                      aria-label={`Position: ${position.title}`}
                    >
                      {position.title}
                    </Typography>
                    <Typography color={textColor} sx={{ mt: -0.5, typography: { sm: 'subtitle2', md: 'subtitle1' } }}>
                      {position.duration}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <List aria-label="Responsibilities at the company">
                {company.responsibilities.map((responsibility, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <HomePageSectionListItem key={index}>
                    <Typography component="span" sx={{ typography: { xs: 'body', sm: 'h6' } }} color={textColor}>
                      {responsibility}
                    </Typography>
                  </HomePageSectionListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </FocusDashedOutline>
    </Box>
  );
}
