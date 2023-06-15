import { Typography } from '@mui/material';

import { AdminPageLayout } from './AdminPageLayout';
import { adminModuleConstants } from '../constants';

export function PermissionsHomePage() {
  return (
    <AdminPageLayout pageTitle={adminModuleConstants.pageTitles.permissions}>
      <Typography component="h1" variant="h3">
        Permissions
      </Typography>
    </AdminPageLayout>
  );
}
