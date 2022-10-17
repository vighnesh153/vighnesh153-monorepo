import path from "path";

import { spinnies } from "./spinnies";
import { delay } from "./delay";
import { writeFile } from "./writeFile";

/**
 * Create the README.md file
 */
export async function createReadmeFile(parentDirectory: string, packageName: string) {
  const fileName = path.resolve(parentDirectory, "README.md");

  spinnies.add("create README.md", {
    text: "🚧 Creating README.md file...\n"
  });
  await delay();

  // create the file
  await writeFile(fileName, `# ${packageName}`);

  spinnies.succeed("create README.md", {
    text: "✅ Created README.md file 🎉\n"
  });
}