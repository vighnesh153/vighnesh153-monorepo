function monorepo(localPath: string): string {
  return `https://github.com/vighnesh153/vighnesh153-monorepo/tree/main${localPath}`;
}

function nodejsLib(localPath: string): string {
  return monorepo(`/nodejs-tools/nodejs-lib${localPath}`);
}

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
    reactUseGlobalState: {
      sourceCode: monorepo('/nodejs-tools/nodejs-packages/react-use-global-state'),
      demo: 'https://www.npmjs.com/package/@vighnesh153/react-use-global-state',
    },
  },
};
