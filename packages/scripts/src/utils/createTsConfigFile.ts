import path from "path";

import { spinnies } from "./spinnies";
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

  spinnies.add("create tsconfig.json", {
    text: "🚧 Creating tsconfig.json file...\n"
  });
  await delay();

  // create the file
  const tsconfig = {
    extends: `@vighnesh153/package-tsconfig/${extendFrom}.json`,
    include: ["**/*.ts", "**/*.tsx"],
    exclude: ["node_modules"]
  }

  // Only add for nextjs
  if (extendFrom === "nextjs") {
    tsconfig.include.push("next-env.d.ts");
  }

  await writeFile(fileName, JSON.stringify(tsconfig, null, 2));

  spinnies.succeed("create tsconfig.json", {
    text: "✅ Created tsconfig.json file 🎉\n"
  });
}
