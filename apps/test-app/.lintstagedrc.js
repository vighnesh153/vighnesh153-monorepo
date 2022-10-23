const path = require('path');

const buildEslintCommand = (filenames) => {
  console.log('Current working directory:', process.cwd());
  const filenameMapper = (filename) => path.relative(process.cwd(), filename);
  const files = `--file ${filenames.map(filenameMapper).join(' --file ')}`;
  return `next lint --max-warnings=0 --fix ${files}`;
};

module.exports = {
  '*.{js,jsx,ts,tsx,md,mdx}': [buildEslintCommand, 'prettier --write'],
};
