import { hashTags } from './hashTags';

export const internalLinks = {
  main: `/#${hashTags.main}`,
  homePage: {
    aboutMe: `/#${hashTags.homePage.aboutMe}`,
    experience: `/#${hashTags.homePage.experience}`,
    contactMe: `/#${hashTags.homePage.contactMe}`,
    footer: `/#${hashTags.homePage.footer}`,
  },
  projects: {
    root: '/projects',
    featured: `/projects#${hashTags.projects.featuredProjects}`,
    otherAwesomeProjects: `/projects#${hashTags.projects.otherAwesomeProjects}`,
  },
};
