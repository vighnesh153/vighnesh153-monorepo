const { defineConfig } = require('eslint-define-config');
const { tsRules } = require('./tsRules.cjs');

module.exports = defineConfig({
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
      ],
      plugins: ['import'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        amd: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
        },
      },
      rules: {
        ...tsRules,
      },
    },
  ],
});
