const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'calendly.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.calendly.com',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  // Add this to allow cross-origin requests during development from your local network IP
  experimental: {
    allowedDevOrigins: ["http://10.168.0.3:3000"],
  },
  // Disable ESLint during builds as it conflicts with flat config
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
