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

      <Box component="main" id="main">
        Pikachu
      </Box>
    </>
  );
}
