import { Box } from '@mui/material';
import { Head, Navbar, NavItemSection } from '@/modules/common';

import { adminModuleConstants } from '../constants';
import { AdminPageGuard } from './AdminPageGuard';
import { AdminSideNavigation } from './AdminSideNavigation';

const navItemSections: Array<NavItemSection> = [NavItemSection.ProfileAndSignIn];

export function AdminHomePage() {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AdminPageGuard>
      <Head>
        <title>{adminModuleConstants.pageTitle}</title>
      </Head>

      <Navbar navItemSections={navItemSections} />

      <Box
        component="main"
        sx={{
          pt: 12,
          px: '2rem',
          mx: 'auto',
          maxWidth: 1200,
          display: 'flex',
        }}
      >
        <AdminSideNavigation />
      </Box>
    </AdminPageGuard>
  );
}
