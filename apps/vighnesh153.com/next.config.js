const { withAxiom } = require('next-axiom');
const nextTranspileModules = require('next-transpile-modules');

const withTM = nextTranspileModules([
  '@vighnesh153/react-hooks',
  '@vighnesh153/types',
  '@vighnesh153/ui',
  '@vighnesh153/utils',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(withAxiom(nextConfig));
