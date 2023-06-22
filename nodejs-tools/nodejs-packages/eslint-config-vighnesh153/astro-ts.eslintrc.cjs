module.exports = {
  extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-recommended', 'vighnesh153/ts-base.eslintrc.cjs'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
  rules: {},
};
