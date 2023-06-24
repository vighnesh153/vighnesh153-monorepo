import { ESLint } from 'eslint';

const removeIgnoredEslintFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(' ');
};

const eslintCommand = `eslint --max-warnings=0 --fix`;
const prettierCommand = 'prettier --write';

export default {
  '*.mdx': [eslintCommand, prettierCommand],
  '*.md': [prettierCommand],
  // TODO: uncomment the following line when it starts to work
  // To test if this will work,
  //     make some eslint errors in ./nodejs-tools/nodejs-apps/vighnesh153.com_astro/src/layouts/Layout.astro
  //     and then run this command: ./node_modules/.bin/eslint --max-warnings=0 --fix ./nodejs-tools/nodejs-apps/vighnesh153.com_astro/src/layouts/Layout.astro
  '*.astro': [
    // eslintCommand,
    prettierCommand,
  ],
  '*.js': [prettierCommand],
  '*.{ts,tsx}': async (files) => {
    const eslintFiles = await removeIgnoredEslintFiles(files);
    return [
      `${eslintCommand} ${eslintFiles}`,
      // Doing the following "map" approach to avoid this error
      // "ENAMETOOLONG: name too long"
      ...files.map((file) => `${prettierCommand} ${file}`),
    ];
  },
};
