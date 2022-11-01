import fs from 'node:fs/promises';

/**
 * Reads the file
 */
export async function readFile(filePath: string) {
  const file = await fs.readFile(filePath);
  return file.toString('utf-8');
}
