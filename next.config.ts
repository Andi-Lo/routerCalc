import type { NextConfig } from 'next';

const isProd = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/react-playground' : '',
  images: isProd ? { unoptimized: true } : {}
};

export default nextConfig;
