'use client';

import { Box } from '@mui/material';

import {
  AsideEmailAddress,
  AsideSocialLinks,
  SkipToMainContent,
  TopNavigationBar,
} from '@/ui-modules/common/components';
import { NavItemType } from '@/ui-modules/common/types';

import { IntroductionSection } from './IntroductionSection';
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

// const adminNavItemTypes: Array<NavItemType> = [NavItemType.Admin, ...navItemTypes];

export function HomePage() {
  return (
    <>
      <SkipToMainContent />
      <TopNavigationBar navItemTypes={navItemTypes} />
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
          {/* other sections */}
          <IntroductionSection />
        </Box>

        <FooterSection />
      </Box>
    </>
  );
}
