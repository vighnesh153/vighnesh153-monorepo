import { NavItemType } from './NavItemType';

export type NavItem = (
  | { label: string; href: string; type: 'link' }
  | { element: React.ReactElement; type: 'custom' }
) & {
  id: NavItemType;
};
