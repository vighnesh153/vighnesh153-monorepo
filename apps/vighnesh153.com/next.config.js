/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const modules = ['@vighnesh153/react-hooks', '@vighnesh153/types', '@vighnesh153/ui', '@vighnesh153/utils'];

const withTM = require('next-transpile-modules')(modules);

module.exports = withTM(nextConfig);
