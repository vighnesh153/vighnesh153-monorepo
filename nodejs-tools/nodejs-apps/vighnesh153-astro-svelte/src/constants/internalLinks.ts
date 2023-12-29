import { hashTags } from './hashTags';
import { searchParams } from './searchParams';

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
    spl: {
      mainMenu: '/projects/spl',
      editor: (exampleId?: string) =>
        exampleId ? `/projects/spl-editor?${searchParams.exampleId}=${exampleId}` : '/projects/spl-editor',
    },
    tsxPlayground: '/projects/tsx-playground',
    drawingApp: '/projects/drawing-app',
    graphicsProjects: {
      root: '/projects/graphics',
      buildProjectLinkFromId: (projectId: string) => `/projects/graphics/${projectId}`,
    },
    games: {
      root: '/projects/games',
      buildProjectLinkFromId: (projectId: string) => `/projects/games/${projectId}`,
    },
  },
};
