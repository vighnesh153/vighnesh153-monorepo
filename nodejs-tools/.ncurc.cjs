/**
 * @type {import('npm-check-updates/build/src/types/RunOptions.d.ts').RunOptions}
 */
module.exports = {
  upgrade: true,
  reject: [
    'esbuild-wasm',
    'mongodb',
    'mongoose',
    'next-auth',
    'mongodb-memory-server',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint',
    'eslint-config-prettier',
    'eslint-import-resolver-typescript',
    'eslint-plugin-astro',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
  ],
};
