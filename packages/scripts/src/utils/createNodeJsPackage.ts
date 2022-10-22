import path from "path";

import { Logger } from "./logger";
import { delay } from "./delay";
import { fileExists } from "./fileExists";
import { createDirectory } from "./createDirectory";
import { createSpinner } from "./createSpinner";
import { createReadmeFile } from "./createReadmeFile";
import { writeFile } from "./writeFile";

/**
 * Creates an empty node-js package
 */
export async function createNodeJsPackage(
  directoryPath: string,
  packageName: string
) {
  const spinner = createSpinner({
    text: "🚧 Creating an empty NodeJS application..."
  });
  Logger.info(`ℹ️  Package name: ${packageName}\n`);
  await delay();

  // Checks if package already exists
  if (await fileExists(directoryPath)) {
    const parentDirectoryName = path.dirname(path.resolve(directoryPath, ".."));
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

  spinner.succeed({
    text: "✅ Created the NodeJS application 🎉"
  });
}

/**
 * Create the package.json file
 */
async function createPackageDotJson(directoryPath: string, packageName: string) {
  const fileName = path.resolve(directoryPath, "package.json");

  const spinner = createSpinner({
    text: "🚧 Creating package.json file..."
  });
  await delay();

  // write the file
  await writeFile(fileName, JSON.stringify({
    name: packageName,
    version: "1.0.0",
    private: true
  }, null, 2));

  spinner.succeed({
    text: "✅ Created package.json file 🎉"
  });
}
