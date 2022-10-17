import fs from "node:fs/promises";

/**
 * Creates the directory
 */
export async function createDirectory(directory: string) {
  return fs.mkdir(directory);
}
