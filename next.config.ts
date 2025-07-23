import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['images.clerk.dev'],
    unoptimized: false,
  },
};

export default nextConfig;
