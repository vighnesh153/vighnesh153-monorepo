import { withAxiom } from 'next-axiom';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@vighnesh153/types', '@vighnesh153/ui'],
};

export default withAxiom(nextConfig);
