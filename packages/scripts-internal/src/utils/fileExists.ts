import fs from 'node:fs/promises';

/**
 * Checks whether the file exists
 */
export async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
}
