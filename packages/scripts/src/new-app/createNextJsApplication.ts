import path from "path";
import { createNodeJsApplication } from "./createNodeJsApplication";
import { getAppsDirectory, readFile, writeFile } from "../utils";

/**
 * Creates a new next-js application in the apps/ directory
 * @param directoryName {string} name of the directory
 * @param packageName {string} name of the package
 */
export async function createNextJsApplication(directoryName: string, packageName: string) {
  console.log("Creating a NextJS application...");

  // Create an empty nodejs project first
  await createNodeJsApplication(directoryName, packageName);

  await Promise.all([
    // Add next-js specifics to package.json
    addNextJsToPackageJson(directoryName),

    // Create the next.config.js file
    createNextJsConfigFile(directoryName)
  ]);
}

/**
 * Adds nextJs specific things to package.json
 *
 * @param appDirectoryName {string} name of the directory
 * @return {Promise<void>}
 */
async function addNextJsToPackageJson(appDirectoryName: string) {
  // /apps directory
  const appsDirectory = getAppsDirectory();

  // package.json path
  const packageJsonPath = path.resolve(
    appsDirectory,
    appDirectoryName,
    "package.json"
  );

  // package.json content
  const packageJson = JSON.parse(await readFile(packageJsonPath));

  console.log("🚧 Updating package.json with next.js specifics...");

  // Update the content
  packageJson.scripts = {
    dev: "next dev",
    build: "next build",
    start: "next start"
  };
  packageJson.dependencies = {
    "@vighnesh153/next": "*"
  };

  // write back to the package.json file
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("✅ Updated package.json 🎉");
}

/**
 * Create the next.config.js file
 *
 * @param appDirectoryName {string}
 * @return {Promise<void>}
 */
async function createNextJsConfigFile(appDirectoryName: string) {
  // /apps directory
  const appsDirectory = getAppsDirectory();

  // next.config.js file path
  const nextConfigPath = path.resolve(
    appsDirectory,
    appDirectoryName,
    "next.config.js"
  );

  console.log("🚧 Creating next.config.js file...");

  await writeFile(nextConfigPath, `
const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
`.trim());

  console.log("✅ Created next.config.js file 🎉");
}
