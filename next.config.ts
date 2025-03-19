import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configure trailing slashes for generated links
  trailingSlash: true,
};

export default nextConfig;
