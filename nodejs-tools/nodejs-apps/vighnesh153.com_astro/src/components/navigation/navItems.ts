import { externalLinks, internalLinks } from '@/constants';

export interface NavItem {
  text: string;
  link: string;
}

export const AllNavigationItems = {
  aboutMe: { text: 'About me', link: internalLinks.homePage.aboutMe },
  blog: { text: 'Blog', link: externalLinks.blog },
  projects: { text: 'Projects', link: internalLinks.projects.root },
  featuredProjects: { text: 'Featured projects', link: internalLinks.projects.featured },
  otherAwesomeProjects: { text: 'Other Awesome projects', link: internalLinks.projects.otherAwesomeProjects },
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

export const projectNavItems: NavItem[] = [
  AllNavigationItems.blog,
  AllNavigationItems.featuredProjects,
  AllNavigationItems.otherAwesomeProjects,
  AllNavigationItems.resume,
];
