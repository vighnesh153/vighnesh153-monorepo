module.exports = {
  extends: ['vighnesh153/next-ts.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-underscore-dangle': 'off',
  },
};
