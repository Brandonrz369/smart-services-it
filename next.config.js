/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  images: {
    unoptimized: false,
  },
  // Make sure this is false for server-side rendering
  output: undefined
};

module.exports = nextConfig;