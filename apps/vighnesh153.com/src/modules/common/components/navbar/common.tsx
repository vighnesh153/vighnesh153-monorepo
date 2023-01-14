import React, { ReactElement } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';
import { not } from '@vighnesh153/utils';
import { commonConstants } from '../../constants';
import { AuthBox } from '../auth-box';

export function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={not(trigger)}>
      {props.children}
    </Slide>
  );
}

export type NavItem = ({ label: string; href: string; type: 'link' } | { element: ReactElement; type: 'custom' }) & {
  id: string;
};

export const drawerWidth = 320;
export const profileAndSignInId = 'profile-and-sign-in';
export const navItems: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    href: commonConstants.pageLinks.homePage.aboutSection,
    type: 'link',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: commonConstants.pageLinks.homePage.blogsSection,
    type: 'link',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: commonConstants.pageLinks.homePage.projectsSection,
    type: 'link',
  },
  {
    id: 'experience',
    label: 'Experience',
    href: commonConstants.pageLinks.homePage.experienceSection,
    type: 'link',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: commonConstants.pageLinks.homePage.contactMeSection,
    type: 'link',
  },
  {
    id: 'resume',
    label: 'Resume',
    href: commonConstants.resumeLink,
    type: 'link',
  },
  {
    id: profileAndSignInId,
    element: <AuthBox />,
    type: 'custom',
  },
];
