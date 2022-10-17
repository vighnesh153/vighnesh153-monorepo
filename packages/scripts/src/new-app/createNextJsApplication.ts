import path from "path";
import {
  createTsConfigFile,
  delay,
  getAppsDirectory,
  Logger,
  readFile,
  spinnies,
  writeFile,
  createNodeJsPackage
} from "../utils";

/**
 * Creates a new next-js application in the apps/ directory
 */
export async function createNextJsApplication(directoryName: string, packageName: string) {
  Logger.info("Creating a NextJS application...\n");

  const directoryPath = path.resolve(getAppsDirectory(), directoryName);
  const packageJsonPath = path.resolve(directoryPath, "package.json");

  // Create an empty nodejs project first
  await createNodeJsPackage(directoryPath, packageName);

  await Promise.all([
    // Add next-js specifics to package.json
    addNextJsToPackageJson(packageJsonPath),

    // Create the next.config.js file
    createNextJsConfigFile(directoryPath),

    // Create the tsconfig.json file
    createTsConfigFile(directoryPath, "nextjs"
    )
  ]);

  Logger.success("✅ Created the Next.JS application 🎉\n");
  Logger.info(`cd into "apps/${directoryName}" to start development\n`);
}

/**
 * Adds nextJs specific things to package.json
 */
async function addNextJsToPackageJson(packageJsonPath: string) {
  const spinniesIdentifier = "updates to package.json with next.js tooling"
  spinnies.add(spinniesIdentifier, {
    text: "🚧 Updating package.json with next.js tooling...\n"
  });
  await delay();

  // package.json file
  const packageJson = JSON.parse(await readFile(packageJsonPath));

  // Update the content
  Object.assign(packageJson, {
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start"
    },
    dependencies: {
      "@vighnesh153/vendor-next": "*"
    }
  });

  // write back to the package.json file
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  spinnies.succeed(spinniesIdentifier, {
    text: "✅ Updated package.json with next.js tooling 🎉\n"
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

  const spinniesIdentifier = "create next.config.js"
  spinnies.add(spinniesIdentifier, {
    text: "🚧 Creating next.config.js file...\n"
  });
  await delay();

  await writeFile(nextConfigPath, `
const withTM = require("next-transpile-modules")([
  "@vighnesh153/package-web-ui"
]);

module.exports = withTM({
  reactStrictMode: true,
});
`.trim());

  spinnies.succeed(spinniesIdentifier, {
    text: "✅ Created next.config.js file 🎉\n"
  });
}
