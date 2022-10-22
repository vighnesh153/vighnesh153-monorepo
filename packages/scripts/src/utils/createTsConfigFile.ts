import path from "path";
import { createSpinner } from "@vighnesh153/vendor-spinnies";

import { delay } from "./delay";
import { writeFile } from "./writeFile";

/**
 * Create the tsconfig.json file
 */
export async function createTsConfigFile(
  directoryPath: string,
  extendFrom: "nextjs" | "react-library" | "base" = "nextjs"
) {
  const fileName = path.resolve(directoryPath, "tsconfig.json");

  const spinner = createSpinner({
    text: "🚧 Creating tsconfig.json file..."
  });
  await delay();

  // define the file content
  const tsconfig = {
    extends: `@vighnesh153/package-tsconfig/${extendFrom}.json`,
    include: ["**/*.ts", "**/*.tsx"],
    exclude: ["node_modules"]
  }

  // Only add for nextjs
  if (extendFrom === "nextjs") {
    tsconfig.include.push("next-env.d.ts");
  }

  // create the file
  await writeFile(fileName, JSON.stringify(tsconfig, null, 2));

  spinner.succeed({
    text: "✅ Created tsconfig.json file 🎉"
  });
}
