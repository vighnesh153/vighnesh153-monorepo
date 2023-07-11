exports.tsRules = {
  '@typescript-eslint/no-empty-function': ['error'],
  /**
   * @see https://github.com/typescript-eslint/tslint-to-eslint-config/issues/856
   */
  '@typescript-eslint/no-shadow': ['error'],
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-use-before-define': ['error'],
  '@typescript-eslint/no-useless-constructor': ['error'],
  'comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    },
  ],
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': 'off',
  'import/no-named-as-default-member': 'off',
  'import/no-unresolved': 'off', // turning it off because it is not working ☹️
  // 'import/order': [
  //   'error',
  //   {
  //     alphabetize: { order: 'asc' },
  //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
  //   },
  // ],
  'import/prefer-default-export': 'off',
  'max-len': ['error', { code: 120 }],
  'no-duplicate-imports': 'error',
  'no-empty-function': 'off',
  'no-plusplus': 'off',
  'no-shadow': 'off',
  'no-underscore-dangle': 'error',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'no-useless-constructor': 'off',
  'no-void': 'off',
  'object-curly-newline': [
    'error',
    {
      ObjectExpression: { consistent: true },
      ObjectPattern: { consistent: true },
      ImportDeclaration: { consistent: true },
      ExportDeclaration: { consistent: true },
    },
  ],
  'operator-linebreak': 'off',
  'prefer-arrow-callback': 'error',
  'prefer-destructuring': 'warn',
  quotes: ['error', 'single', { allowTemplateLiterals: true }],
};
