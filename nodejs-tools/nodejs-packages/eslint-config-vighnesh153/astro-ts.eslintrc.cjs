const { tsRules } = require("./tsRules.cjs");

module.exports = {
  extends: [
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "vighnesh153/ts-base.eslintrc.cjs",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    extraFileExtensions: [".astro", ".ts", ".tsx"],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
      rules: {
        ...tsRules,
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
  rules: {},
};
