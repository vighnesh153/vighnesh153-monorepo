import { ReactNode } from 'react';
import { not } from '@vighnesh153/utils';
import { useIsAdmin } from '@/modules/common';

export function AdminPageGuard(props: { children?: ReactNode }) {
  const { isAdmin } = useIsAdmin();

  if (not(isAdmin)) {
    return null;
  }

  return props.children;
}
