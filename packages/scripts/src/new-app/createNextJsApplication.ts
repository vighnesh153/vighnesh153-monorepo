import path from "path";

import {
  createSpinner,
  createTsConfigFile,
  delay,
  getAppsDirectory,
  Logger,
  readFile,
  writeFile,
  createNodeJsPackage, createDirectory
} from "../utils";
import { promptForPort } from "./prompts";

/**
 * Creates a new next-js application in the apps/ directory
 */
export async function createNextJsApplication(directoryName: string, packageName: string) {
  // Development server port number
  const devPort = await promptForPort()

  Logger.info("Creating a NextJS application...");

  const directoryPath = path.resolve(getAppsDirectory(), directoryName);
  const packageJsonPath = path.resolve(directoryPath, "package.json");

  // Create an empty nodejs project first
  await createNodeJsPackage(directoryPath, packageName);

  await Promise.all([
    // Add next-js specifics to package.json
    addNextJsToPackageJson(packageJsonPath, devPort),

    // Create the next.config.js file
    createNextJsConfigFile(directoryPath),

    // Create the tsconfig.json file
    createTsConfigFile(directoryPath, "nextjs"),

    // Creates the "pages/" directory and adds content to it
    createPagesDirectoryAndAddContent(directoryPath),

    // Creates the "styles/" directory and adds content to it
    createStylesDirectoryAndAddContent(directoryPath),
  ]);

  Logger.success("✅ Created the Next.JS application 🎉\n");
  Logger.info(`cd into "apps/${directoryName}" to start development\n`);
}

/**
 * Adds nextJs specific things to package.json
 */
async function addNextJsToPackageJson(packageJsonPath: string, devPort: number) {
  const spinner = createSpinner({
    text: "🚧 Updating package.json with next.js tooling..."
  });
  await delay();

  // package.json file
  const packageJson = JSON.parse(await readFile(packageJsonPath));

  // Update the content
  Object.assign(packageJson, {
    scripts: {
      dev: `next dev --port ${devPort}`,
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      "@vighnesh153/dependencies-nextjs": "*",
      "@vighnesh153/package-web-ui": "*",
    },
    devDependencies: {
      "@vighnesh153/dependencies-nextjs-dev": "*"
    }
  });

  // write back to the package.json file
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  spinner.succeed({
    text: "✅ Updated package.json with next.js tooling 🎉"
  });
}

/**
 * Create the next.config.js file
 */
async function createNextJsConfigFile(directoryPath: string) {
  // next.config.js file path
  const nextConfigPath = path.resolve(
    directoryPath,
    "next.config.js"
  );

  const spinner = createSpinner({
    text: "🚧 Creating next.config.js file..."
  });
  await delay();

  // write to the "next.config.js" file
  await writeFile(nextConfigPath, `
const withTM = require("next-transpile-modules")([
  "@vighnesh153/package-web-ui"
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});
`.trim());

  spinner.succeed({
    text: "✅ Created next.config.js file 🎉"
  });
}

/**
 * Creates the "pages/" directory and add sample files to it
 */
async function createPagesDirectoryAndAddContent(directoryPath: string) {
  const pagesDirectoryPath = path.resolve(directoryPath, "pages");

  // Make the "pages/" directory
  await createDirectory(pagesDirectoryPath)

  await Promise.all([
    createHomePage(pagesDirectoryPath),
    createHelloWorldApi(pagesDirectoryPath),
    createUnderscoreAppTsxFile(pagesDirectoryPath),
  ]);
}

/**
 * Creates the home page
 */
async function createHomePage(directoryPath: string) {
  const homePagePath = path.resolve(directoryPath, "index.tsx");

  const spinner = createSpinner({
    text: "🚧 Creating \"pages/index.tsx\" file..."
  });
  await delay();

  // Create the "pages/index.tsx file"
  await writeFile(homePagePath, `
import { Button } from "@vighnesh153/package-web-ui";

export default function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Button />
    </div>
  );
}
    `.trim())

  spinner.succeed({
    text: "✅ Created \"pages/index.tsx\" file"
  });
}

/**
 * Creates the sample "pages/api/hello.ts" api
 */
async function createHelloWorldApi(directoryPath: string) {
  const apiDirectory = path.resolve(directoryPath, "api");
  const helloApiPath = path.resolve(apiDirectory, "hello.ts");

  const spinner = createSpinner({
    text: "🚧 Creating \"pages/api/hello.ts\" file..."
  });
  await delay();

  // create "pages/api" directory
  await createDirectory(apiDirectory);

  // write to "pages/api/hello.ts" file
  await writeFile(helloApiPath, `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'Vighnesh' });
}
  `.trim());

  spinner.succeed({
    text: "✅ Created \"pages/api/hello.ts\" file"
  });
}

/**
 * Creates the "pages/_app.tsx" file
 */
async function createUnderscoreAppTsxFile(directoryPath: string) {
  const appTsxFilePath = path.resolve(directoryPath, "_app.tsx");

  const spinner = createSpinner({
    text: "🚧 Creating \"pages/_app.tsx\" file..."
  });
  await delay();

  await writeFile(appTsxFilePath, `
  import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
  `.trim());

  spinner.succeed({
    text: "✅ Created \"pages/_app.tsx\" file"
  });
}

/**
 * Creates the "styles/" directory and adds content to it
 */
async function createStylesDirectoryAndAddContent(directoryPath: string) {
  const stylesDirectoryPath = path.resolve(directoryPath, "styles");

  // create styles/ directory
  await createDirectory(stylesDirectoryPath);

  await Promise.all([
    createGlobalsCssFile(stylesDirectoryPath),
  ]);
}

/**
 * Creates the "styles/globals.css" file
 */
async function createGlobalsCssFile(directoryPath: string) {
  const globalsCssPath = path.resolve(directoryPath, "globals.css")

  const spinner = createSpinner({
    text: "🚧 Creating \"styles/globals.css\" file..."
  });
  await delay();

  // write to the file
  await writeFile(globalsCssPath, `
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
}
  `.trim());

  spinner.succeed({
    text: "✅ Created \"styles/globals.css\" file"
  });
}
