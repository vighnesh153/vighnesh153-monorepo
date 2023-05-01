import { useSession } from 'next-auth/react';
import { adminEmails } from '../constants';

export function useIsAdmin() {
  const session = useSession();
  return { isAdmin: adminEmails.includes(session.data?.user?.email ?? '') };
}
