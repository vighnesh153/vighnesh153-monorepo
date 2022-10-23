module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: true,
    amd: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
};
