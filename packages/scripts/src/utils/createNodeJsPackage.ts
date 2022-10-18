import path from "path";

import { Logger } from "./logger";
import { spinnies } from "./spinnies";
import { delay } from "./delay";
import { fileExists } from "./fileExists";
import { createDirectory } from "./createDirectory";
import { createReadmeFile } from "./createReadmeFile";
import { writeFile } from "./writeFile";

/**
 * Creates an empty node-js package
 */
export async function createNodeJsPackage(
  directoryPath: string,
  packageName: string
) {
  const spinnerIdentifier = "Creation of an empty NodeJS package";
  spinnies.add(spinnerIdentifier, {
    text: "🚧 Creating an empty NodeJS application...\n"
  });
  Logger.info(`ℹ️  Package name: ${packageName}\n`);
  await delay();

  // Checks if package already exists
  if (await fileExists(directoryPath)) {
    const parentDirectoryName = path.dirname(path.resolve(directoryPath, '..'));
    const currentDirectoryName = path.dirname(directoryPath);
    throw new Error(
      `"${parentDirectoryName}/${currentDirectoryName}" already exists...`
    );
  }

  // create the package directory
  await createDirectory(directoryPath);

  await Promise.all([
    // Create the package.json file
    createPackageDotJson(directoryPath, packageName),

    // Create the README.md file
    createReadmeFile(directoryPath, `# ${packageName}`)
  ]);

  spinnies.succeed(spinnerIdentifier, {
    text: "✅ Created the NodeJS application 🎉\n",
  })
}

/**
 * Create the package.json file
 */
async function createPackageDotJson(directoryPath: string, packageName: string) {
  const fileName = path.resolve(directoryPath, "package.json");

  const spinnerIdentifier = "creation of package.json";
  spinnies.add(spinnerIdentifier, {
    text: "🚧 Creating package.json file...\n"
  });
  await delay();

  // write the file
  await writeFile(fileName, JSON.stringify({
    name: packageName,
    version: "1.0.0",
    private: true
  }, null, 2));

  spinnies.succeed(spinnerIdentifier, {
    text: "✅ Created package.json file 🎉\n"
  });
}
