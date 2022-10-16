import {
  getAppsDirectory,
  fileExists,
  createDirectory,
  writeFile, createReadmeFile
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
  console.log("🚧 Creating a NodeJS application...");
  console.log(`ℹ️ App directory: apps/${newAppDirectoryName}`);
  console.log(`ℹ️ Package name: ${newAppPackageName}`);

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

  console.log("✅ Created the NodeJS application 🎉");
};

/**
 * Create the package.json file
 *
 * @param parentDirectory {string} path of the directory
 * @param packageName {string} name of the package
 * @return {Promise<void>}
 */
async function createPackageDotJson(parentDirectory: string, packageName: string) {
  const fileName = path.resolve(parentDirectory, "package.json");

  console.log("🚧 Creating package.json file...");

  // write the file
  await writeFile(fileName, JSON.stringify({
    name: packageName,
    version: "1.0.0",
    private: true
  }, null, 2));

  console.log("✅ Created package.json file 🎉");
}
