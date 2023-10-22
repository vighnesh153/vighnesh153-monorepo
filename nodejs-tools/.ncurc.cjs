/**
 * @type {import('npm-check-updates/build/src/types/RunOptions.d.ts').RunOptions}
 */
module.exports = {
  'upgrade': true,
  'reject': [
    'mongodb',
    'mongoose',
    'next-auth',
    'mongodb-memory-server'
  ],
};