function monorepo(localPath: string): string {
  return `https://github.com/vighnesh153/vighnesh153-monorepo/tree/main${localPath}`;
}

function nodejsLegacy(localPath: string): string {
  return monorepo(`/tools-nodejs-legacy${localPath}`);
}

function denoBrowserTools(localPath: string): string {
  return monorepo(`/tools-deno/tools-browser${localPath}`);
}

export const searchParams = {
  exampleId: "example-id",
};

export const hashTags = {
  main: "main",
  header: "header",
  footer: "footer",
  homePage: {
    aboutMe: "about-me",
    experience: "experience",
    projects: "projects",
    contactMe: "contact-me",
  },
  projects: {
    projectsMain: "projects",
  },
};

export const externalLinks = {
  social: {
    github: "https://github.com/vighnesh153",
    linkedin: "https://www.linkedin.com/in/vighnesh153",
    stackoverflow: "https://stackoverflow.com/users/8822610/vighnesh153",
    codepen: "https://codepen.io/vighnesh153",
  },
  githubRepo: monorepo("/tools-nodejs/vighnesh153-astro"),
  // resume: "https://bit.ly/vighnesh153-resume",
  projects: {
    spl: {
      sourceCode: nodejsLegacy("/spl"),
      learnSyntax: nodejsLegacy("/spl/README.md"),
    },
    tsxBundler: {
      sourceCode: nodejsLegacy("/tsx-bundler"),
    },
    drawingApp: {
      sourceCode: nodejsLegacy("/drawing-app"),
    },
    graphicsProjects: {
      sourceCode: denoBrowserTools("/src/graphics_programming"),
    },
    games: {
      sourceCode: denoBrowserTools("/src/graphics_programming"),
    },
  },
};

export const internalLinks = {
  host: "vighnesh153.dev",
  domain: "https://vighnesh153.dev",
  main: `#${hashTags.main}`,
  blog: "/blog",
  resume: "/resume",
  homePage: {
    root: "/",
    aboutMe: `/#${hashTags.homePage.aboutMe}`,
    experience: `/#${hashTags.homePage.experience}`,
    projects: `/#${hashTags.homePage.projects}`,
    contactMe: `/#${hashTags.homePage.contactMe}`,
    footer: `/#${hashTags.footer}`,
  },
  projects: {
    root: "/projects",
    projectsMain: `/projects#${hashTags.projects.projectsMain}`,
    spl: {
      mainMenu: "/projects/spl",
      editor: (exampleId?: string) =>
        exampleId
          ? `/projects/spl-editor?${searchParams.exampleId}=${exampleId}`
          : "/projects/spl-editor",
    },
    tsxPlayground: "/projects/tsx-playground",
    drawingApp: "/projects/drawing-app",
    graphicsProjects: {
      root: "/projects/graphics",
      buildProjectLinkFromId: (projectId: string) =>
        `/projects/graphics/${projectId}`,
    },
    games: {
      root: "/projects/games",
      buildProjectLinkFromId: (projectId: string) =>
        `/projects/games/${projectId}`,
    },
  },
  tools: {
    root: "/tools",
    calculators: {
      root: "/tools/calculators",
    },
  },
  private: {
    root: "/private",
    buildPrivateContentLinkFromId: (contentId: string) =>
      `/private?contentId=${contentId}`,
  },
};
