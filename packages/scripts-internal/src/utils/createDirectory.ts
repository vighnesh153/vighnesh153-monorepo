import fs from 'node:fs/promises';

/**
 * Creates the directory
 */
export async function createDirectory(directory: string, mode: 0o0 | 0o1 | 0o2 | 0o3 | 0o4 | 0o5 | 0o6 | 0o7 = 7) {
  return fs.mkdir(directory, { recursive: true, mode });
}
