import { Typography } from '@mui/material';

import { AdminPageLayout } from './AdminPageLayout';
import { adminModuleConstants } from '../constants';

export function DashboardHomePage() {
  return (
    <AdminPageLayout pageTitle={adminModuleConstants.pageTitles.dashboard}>
      <Typography component="h1" variant="h3">
        Dashboard
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Welcome to the admin panel. This is the control center for all administrative actions on vighnesh153.com
      </Typography>
    </AdminPageLayout>
  );
}
