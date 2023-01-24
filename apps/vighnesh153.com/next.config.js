const { withAxiom } = require('next-axiom');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@vighnesh153/fake-data',
    '@vighnesh153/react-hooks',
    '@vighnesh153/types',
    '@vighnesh153/ui',
    '@vighnesh153/utils',
  ],
};

module.exports = withAxiom(nextConfig);
