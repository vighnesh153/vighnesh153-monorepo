'use client';

import { Box } from '@mui/material';

import { SkipToMainContent, TopNavigationBar } from '@/ui-modules/common/components';
import { NavItemType } from '@/ui-modules/common/types';

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

      <Box component="main" id="main" sx={{ height: 2000 }}>
        Pikachu
        <Box component="section" id="about" sx={{ background: 'red', height: 1000 }}>
          About
        </Box>
        <Box component="section" id="experience" sx={{ background: 'yellow', height: 1000 }}>
          Experience
        </Box>
        <Box component="section" id="contact" sx={{ background: 'green', height: 1000 }}>
          Contact
        </Box>
      </Box>
    </>
  );
}
