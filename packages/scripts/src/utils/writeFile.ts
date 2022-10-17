import fs from "node:fs/promises";

/**
 * Writes in the file
 */
export async function writeFile(filePath: string, fileContent: string) {
  await fs.writeFile(filePath, fileContent);
}
