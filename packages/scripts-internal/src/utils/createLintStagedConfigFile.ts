import path from 'path';
import { createSpinner } from './createSpinner';
import { delay } from './delay';
import { writeFile } from './writeFile';

/**
 * Create .lintstagedrc.js
 */
export async function createLintStagedConfigFile(directoryPath: string) {
  const lintStagedConfigFilePath = path.resolve(directoryPath, 'lint-staged.config.js');

  const spinner = createSpinner({
    text: `🚧 Creating "lint-staged.config.js" file...`,
  });
  await delay();

  // write to the file
  await writeFile(
    lintStagedConfigFilePath,
    `
const baseLintStaged = require('../../.lintstagedrc');

module.exports = { ...baseLintStaged };
  `.trim()
  );

  spinner.succeed({
    text: `✅ Created "lint-staged.config.js" file 🎉`,
  });
}
