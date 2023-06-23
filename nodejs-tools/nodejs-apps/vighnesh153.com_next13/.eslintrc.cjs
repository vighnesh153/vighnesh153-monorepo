module.exports = {
  extends: ['vighnesh153/next-ts.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-underscore-dangle': 'off',
  },
};
