/**
 * @type {import('npm-check-updates/build/src/types/RunOptions.d.ts').RunOptions}
 */
module.exports = {
  upgrade: true,
  reject: ['esbuild-wasm', 'mongodb', 'mongoose', 'next-auth', 'mongodb-memory-server'],
};
