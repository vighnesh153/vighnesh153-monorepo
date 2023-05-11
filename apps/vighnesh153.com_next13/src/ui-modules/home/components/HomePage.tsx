'use client';

import { Box } from '@mui/material';

import {
  AsideEmailAddress,
  AsideSocialLinks,
  SkipToMainContent,
  TopNavigationBar,
} from '@/ui-modules/common/components';
import { useIsAdmin } from '@/ui-modules/common/hooks';
import { NavItemType } from '@/ui-modules/common/types';

import { IntroductionSection } from './IntroductionSection';
import { AboutMeSection } from './AboutMeSection';
import { ExperienceSection } from './ExperienceSection';
import { ContactMeSection } from './ContactMeSection';
import { FooterSection } from './FooterSection';

const navItemTypes: Array<NavItemType> = [
  NavItemType.About,
  NavItemType.Blog,
  NavItemType.Projects,
  NavItemType.Experience,
  NavItemType.Contact,
  NavItemType.Resume,
  NavItemType.ProfileAndSignIn,
];

const adminNavItemTypes: Array<NavItemType> = [NavItemType.Admin, ...navItemTypes];

export function HomePage() {
  const { isAdmin } = useIsAdmin();

  return (
    <>
      <SkipToMainContent />
      <TopNavigationBar navItemTypes={isAdmin ? adminNavItemTypes : navItemTypes} />
      <AsideSocialLinks />
      <AsideEmailAddress />

      <Box component="main" id="main" sx={{ px: '2rem' }}>
        <Box
          sx={{
            mx: 'auto',
            px: {
              sm: '2rem',
              md: '4rem',
            },
            maxWidth: 1200,
          }}
        >
          <IntroductionSection />
          <AboutMeSection />
          <ExperienceSection />
          <ContactMeSection />
        </Box>

        <FooterSection />
      </Box>
    </>
  );
}
