import type {NextConfig} from 'next';
require('dotenv').config({ path: './.env' });

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'generativelanguage.googleapis.com',
      },
    ],
    unoptimized: false,
    // dataImages is not a valid property here. To use data URIs for images,
    // they need to be handled on a per-component basis or enabled differently.
    // For now, removing it will fix the build error.
  },
};

export default nextConfig;
