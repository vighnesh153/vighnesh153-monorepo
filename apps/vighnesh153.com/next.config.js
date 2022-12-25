/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTM = require('next-transpile-modules')(['@vighnesh153/ui']);

module.exports = withTM(nextConfig);
