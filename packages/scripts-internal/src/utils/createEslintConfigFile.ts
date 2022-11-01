import path from 'path';
import { createSpinner } from './createSpinner';
import { delay } from './delay';
import { writeFile } from './writeFile';

/**
 * Create eslint config file
 */
export async function createEslintConfigFile(
  directoryPath: string,
  extendFrom: 'next-ts' | 'react-ts-library' | 'ts-base' = 'ts-base'
) {
  const eslintConfigFilePath = path.resolve(directoryPath, '.eslintrc.js');

  const spinner = createSpinner({
    text: `🚧 Creating ".eslintrc.js" file...`,
  });
  await delay();

  // write to the file
  await writeFile(
    eslintConfigFilePath,
    `
module.exports = {
  extends: [
    "vighnesh153/${extendFrom}.eslintrc",
  ],
};
  `.trim()
  );

  spinner.succeed({
    text: `✅ Created ".eslintrc.js" file 🎉`,
  });
}
