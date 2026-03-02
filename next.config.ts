import type { NextConfig } from 'next';

const isProd = process.env.GITHUB_ACTIONS === 'true';
const basePath = isProd ? '/routerCalc' : '';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: isProd ? { unoptimized: true } : {}
};

export default nextConfig;
