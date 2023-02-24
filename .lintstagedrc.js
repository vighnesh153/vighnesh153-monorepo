export default {
  '*.{ts,tsx,mdx}': ['eslint --max-warnings=0 --fix', 'prettier --write'],
  '*.{js,jsx}': ['prettier --write'],
  // '*.md': ['prettier --write'],
};
