import { externalLinks, internalLinks } from "./links.ts";

export interface NavItem {
  text: string;
  link: string;
  id: string;
}

export const AllNavigationItems = {
  home: {
    text: "Home",
    link: internalLinks.homePage.root,
    id: "primary-nav-link-home",
  },
  aboutMe: {
    text: "About me",
    link: internalLinks.homePage.aboutMe,
    id: "primary-nav-link-about-me",
  },
  blog: { text: "Blog", link: externalLinks.blog, id: "primary-nav-link-blog" },
  projects: {
    text: "Projects",
    link: internalLinks.homePage.projects,
    id: "primary-nav-link-projects",
  },
  experience: {
    text: "Experience",
    link: internalLinks.homePage.experience,
    id: "primary-nav-link-experience",
  },
  resume: {
    text: "Resume",
    link: externalLinks.resume,
    id: "primary-nav-link-resume",
  },
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

// For "/tutor"
export const tutorNavItems: NavItem[] = [
  AllNavigationItems.home,
  AllNavigationItems.projects,
];
