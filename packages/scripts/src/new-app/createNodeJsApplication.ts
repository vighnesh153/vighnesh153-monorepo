import {
  getAppsDirectory,
  fileExists,
  createDirectory,
  writeFile, createReadmeFile, Logger, spinnies, delay
} from "../utils";
import path from "path";

/**
 * Creates an empty node-js application in the apps/ directory
 * @param newAppDirectoryName {string} name of the directory
 * @param newAppPackageName {string} name of the package
 */
export async function createNodeJsApplication(
  newAppDirectoryName: string,
  newAppPackageName: string
) {
  spinnies.add("NodeJS application", {
    text: "🚧 Creating a NodeJS application...\n"
  });
  Logger.info(`ℹ️  App directory: apps/${newAppDirectoryName}`)
  Logger.info(`ℹ️  Package name: ${newAppPackageName}\n`);
  await delay()

  // /apps directory
  const appsDirectory = getAppsDirectory();

  // /apps/{app-name} directory
  const newAppDirectory = path.resolve(appsDirectory, newAppDirectoryName);

  if (await fileExists(newAppDirectory)) {
    throw new Error(`"apps/${newAppDirectoryName}" already exists...`);
  }

  // Create the directory
  await createDirectory(newAppDirectory);

  await Promise.all([
    // Create the package.json file
    createPackageDotJson(newAppDirectory, newAppPackageName),

    // Create the README.md file
    createReadmeFile(newAppDirectory, newAppPackageName)
  ]);

  spinnies.succeed("NodeJS application", {
    text: "✅ Created the NodeJS application 🎉\n"
  });
}

/**
 * Create the package.json file
 *
 * @param parentDirectory {string} path of the directory
 * @param packageName {string} name of the package
 * @return {Promise<void>}
 */
async function createPackageDotJson(parentDirectory: string, packageName: string) {
  const fileName = path.resolve(parentDirectory, "package.json");

  spinnies.add("create package.json", {
    text: "🚧 Creating package.json file...\n"
  });
  await delay()

  // write the file
  await writeFile(fileName, JSON.stringify({
    name: packageName,
    version: "1.0.0",
    private: true
  }, null, 2));

  spinnies.succeed("create package.json", {
    text: "✅ Created package.json file 🎉\n"
  });
}
