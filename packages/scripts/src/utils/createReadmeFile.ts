import path from "path";

import { spinnies } from "./spinnies";
import { delay } from "./delay";
import { writeFile } from "./writeFile";

/**
 * Create the README.md file
 */
export async function createReadmeFile(parentDirectory: string, fileContent: string) {
  const fileName = path.resolve(parentDirectory, "README.md");

  const spinniesIdentifier = "create README.md";
  spinnies.add(spinniesIdentifier, {
    text: "🚧 Creating README.md file...\n"
  });
  await delay();

  // create the file
  await writeFile(fileName, fileContent);

  spinnies.succeed(spinniesIdentifier, {
    text: "✅ Created README.md file 🎉\n"
  });
}