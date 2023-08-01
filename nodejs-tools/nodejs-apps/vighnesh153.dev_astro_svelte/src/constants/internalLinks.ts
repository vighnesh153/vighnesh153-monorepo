import { hashTags } from './hashTags';

export const internalLinks = {
  main: `#${hashTags.main}`,
  homePage: {
    root: '/',
    aboutMe: `/#${hashTags.homePage.aboutMe}`,
    experience: `/#${hashTags.homePage.experience}`,
    contactMe: `/#${hashTags.homePage.contactMe}`,
    footer: `/#${hashTags.footer}`,
  },
  projects: {
    root: '/projects',
    projectsMain: `/projects#${hashTags.projects.projectsMain}`,
  },
};
