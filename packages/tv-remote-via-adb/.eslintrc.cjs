module.exports = {
  extends: ['vighnesh153/next-ts.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'react/no-array-index-key': 'off',
  },
};
