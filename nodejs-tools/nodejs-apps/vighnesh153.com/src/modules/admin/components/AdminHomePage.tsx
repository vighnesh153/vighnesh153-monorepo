import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';

import { adminModuleConstants } from '../constants';
import { AdminPageLayout } from './AdminPageLayout';

export function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(adminModuleConstants.routes.dashboard);
  }, [router]);

  return (
    <AdminPageLayout>
      <CircularProgress color="secondary" />
    </AdminPageLayout>
  );
}
