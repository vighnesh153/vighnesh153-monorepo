import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { not } from '@vighnesh153/utils';
import { useIsAdmin } from '@/modules/common';

export interface UseAdminPageGuardProps {
  redirectTo?: string;
}

export function useAdminPageGuard(props?: UseAdminPageGuardProps): void {
  const { redirectTo = '/' } = props ?? {};

  const router = useRouter();
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    if (not(isAdmin)) {
      router.replace(redirectTo);
    }
  }, [isAdmin, router, redirectTo]);
}
