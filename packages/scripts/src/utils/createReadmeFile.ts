import path from "path";
import { createSpinner } from "@vighnesh153/vendor-spinnies";

import { delay } from "./delay";
import { writeFile } from "./writeFile";

/**
 * Create the README.md file
 */
export async function createReadmeFile(parentDirectory: string, fileContent: string) {
  const fileName = path.resolve(parentDirectory, "README.md");

  const spinner = createSpinner({
    text: "🚧 Creating README.md file...\n"
  });
  await delay();

  // create the file
  await writeFile(fileName, fileContent);

  spinner.succeed({
    text: "✅ Created README.md file 🎉\n"
  });
}