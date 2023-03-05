import { ESLint } from 'eslint';

const removeIgnoredEslintFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(' ');
};

export default {
  '*.mdx': ['eslint --max-warnings=0 --fix', 'prettier --write'],
  '*.{ts,tsx}': async (files) => {
    const eslintFiles = await removeIgnoredEslintFiles(files);
    // Doing the following "map" approach to avoid this error
    // "ENAMETOOLONG: name too long"
    return [
      `eslint --max-warnings=0 --fix ${eslintFiles}`,
      // ...eslintFiles.map((file) => `eslint --max-warnings=0 --fix ${file}`),
      ...files.map((file) => `prettier --write ${file}`),
    ];
  },
  '*.{js,jsx}': ['prettier --write'],
  // '*.md': ['prettier --write'],
};
