import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

import { Head, Navbar, NavItemSection } from '@/modules/common';
import { adminModuleConstants } from '../constants';
import { AdminPageGuard } from './AdminPageGuard';
import { AdminSideNavigation } from './AdminSideNavigation';

const navItemSections: Array<NavItemSection> = [NavItemSection.ProfileAndSignIn];

export interface AdminPageLayoutProps {
  pageTitle?: string;
}

export function AdminPageLayout(props: PropsWithChildren<AdminPageLayoutProps>) {
  const { pageTitle = adminModuleConstants.pageTitles.home, children } = props;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AdminPageGuard>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Navbar navItemSections={navItemSections} />

      <Box
        component="main"
        sx={{
          pt: 15,
          px: '2rem',
          mx: 'auto',
          maxWidth: 1200,
          display: 'flex',
          gap: 4,
        }}
      >
        <AdminSideNavigation />

        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </AdminPageGuard>
  );
}