function monorepo(localPath: string): string {
  return `https://github.com/vighnesh153/vighnesh153-monorepo/tree/main${localPath}`;
}

function nodejsLib(localPath: string): string {
  return monorepo(`/nodejs-tools/nodejs-lib${localPath}`);
}

export const searchParams = {
  exampleId: 'example-id',
};

export const hashTags = {
  main: 'main',
  header: 'header',
  footer: 'footer',
  homePage: {
    aboutMe: 'about-me',
    experience: 'experience',
    projects: 'projects',
    contactMe: 'contact-me',
  },
  projects: {
    projectsMain: 'projects',
  },
};

export const externalLinks = {
  githubRepo: monorepo('/nodejs-tools/nodejs-apps/vighnesh153-astro-svelte'),
  blog: 'https://blog.vighnesh153.com',
  resume: 'https://bit.ly/vighnesh153-resume',
  projects: {
    spl: {
      sourceCode: nodejsLib('/spl'),
      learnSyntax: nodejsLib('/spl/README.md'),
    },
    tsxBundler: {
      sourceCode: nodejsLib('/tsx-bundler'),
    },
    drawingApp: {
      sourceCode: nodejsLib('/drawing-app'),
    },
    graphicsProjects: {
      sourceCode: nodejsLib('/graphics-programming'),
    },
    games: {
      sourceCode: nodejsLib('/graphics-programming'),
    },
  },
};

export const internalLinks = {
  main: `#${hashTags.main}`,
  homePage: {
    root: '/',
    aboutMe: `/#${hashTags.homePage.aboutMe}`,
    experience: `/#${hashTags.homePage.experience}`,
    projects: `/#${hashTags.homePage.projects}`,
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
  tools: {
    root: '/tools',
    calculators: {
      root: '/tools/calculators',
    },
  },
};
