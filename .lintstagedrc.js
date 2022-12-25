module.exports = {
  '*.{js,jsx,ts,tsx,mdx}': ['eslint --max-warnings=0 --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
};
