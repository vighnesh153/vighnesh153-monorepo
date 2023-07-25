import { externalLinks, internalLinks } from '@/constants';

export interface NavItem {
  text: string;
  link: string;
}

export const AllNavigationItems = {
  home: { text: 'Home', link: internalLinks.homePage.root },
  aboutMe: { text: 'About me', link: internalLinks.homePage.aboutMe },
  blog: { text: 'Blog', link: externalLinks.blog },
  projects: { text: 'Projects', link: internalLinks.projects.root },
  experience: { text: 'Experience', link: internalLinks.homePage.experience },
  resume: { text: 'Resume', link: externalLinks.resume },
} satisfies Record<string, NavItem>;

export const defaultNavItems: NavItem[] = [
  AllNavigationItems.aboutMe,
  AllNavigationItems.blog,
  AllNavigationItems.projects,
  AllNavigationItems.experience,
  AllNavigationItems.resume,
];

// For "/projects"
export const projectsRootNavItems: NavItem[] = [
  AllNavigationItems.home,
  AllNavigationItems.blog,
  AllNavigationItems.resume,
];

// For "/projects/*"
export const projectNavItems: NavItem[] = [
  AllNavigationItems.home,
  AllNavigationItems.blog,
  AllNavigationItems.projects,
  AllNavigationItems.resume,
];
