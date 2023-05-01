import { useAdminPageGuard } from '../hooks';

export function AdminHomePage() {
  useAdminPageGuard();

  return <h1>Hi from admin page</h1>;
}
