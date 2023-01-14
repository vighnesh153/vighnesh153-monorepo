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

export enum NavItemSection {
  About = 'about',
  Blog = 'blog',
  Projects = 'projects',
  Experience = 'experience',
  Contact = 'contact',
  Resume = 'resume',
  ProfileAndSignIn = 'profile-and-sign-in',
}

export type NavItem = ({ label: string; href: string; type: 'link' } | { element: ReactElement; type: 'custom' }) & {
  id: NavItemSection;
};

export const drawerWidth = 320;

export const navItems: NavItem[] = [
  {
    id: NavItemSection.About,
    label: 'About',
    href: commonConstants.pageLinks.homePage.aboutSection,
    type: 'link',
  },
  {
    id: NavItemSection.Blog,
    label: 'Blog',
    href: commonConstants.pageLinks.homePage.blogsSection,
    type: 'link',
  },
  {
    id: NavItemSection.Projects,
    label: 'Projects',
    href: commonConstants.pageLinks.homePage.projectsSection,
    type: 'link',
  },
  {
    id: NavItemSection.Experience,
    label: 'Experience',
    href: commonConstants.pageLinks.homePage.experienceSection,
    type: 'link',
  },
  {
    id: NavItemSection.Contact,
    label: 'Contact',
    href: commonConstants.pageLinks.homePage.contactMeSection,
    type: 'link',
  },
  {
    id: NavItemSection.Resume,
    label: 'Resume',
    href: commonConstants.resumeLink,
    type: 'link',
  },
  {
    id: NavItemSection.ProfileAndSignIn,
    element: <AuthBox />,
    type: 'custom',
  },
];
