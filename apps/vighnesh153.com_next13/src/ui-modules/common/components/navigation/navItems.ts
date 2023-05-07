'use client';

import { NavItem, NavItemType } from '@/ui-modules/common/types';
import { commonModuleConstants } from '@/ui-modules/common/constants';

export const navItems: NavItem[] = [
  {
    id: NavItemType.About,
    label: 'About',
    href: commonModuleConstants.internalLinks.homePage.aboutSection,
    type: 'link',
  },
  {
    id: NavItemType.Admin,
    label: 'Admin',
    href: commonModuleConstants.internalLinks.common.adminSection,
    type: 'link',
  },
  {
    id: NavItemType.Blog,
    label: 'Blog',
    href: commonModuleConstants.internalLinks.common.blogsSection,
    type: 'link',
  },
  {
    id: NavItemType.Projects,
    label: 'Projects',
    href: commonModuleConstants.internalLinks.common.projectsSection,
    type: 'link',
  },
  {
    id: NavItemType.Experience,
    label: 'Experience',
    href: commonModuleConstants.internalLinks.homePage.experienceSection,
    type: 'link',
  },
  {
    id: NavItemType.Contact,
    label: 'Contact',
    href: commonModuleConstants.internalLinks.homePage.contactMeSection,
    type: 'link',
  },
  {
    id: NavItemType.Resume,
    label: 'Resume',
    href: commonModuleConstants.externalLinks.resumeLink,
    type: 'link',
  },
  // {
  //   id: NavItemSection.ProfileAndSignIn,
  //   element: <AuthBox />,
  //   type: 'custom',
  // },
];
