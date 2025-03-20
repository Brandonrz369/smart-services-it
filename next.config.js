/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'self' assets.calendly.com; connect-src 'self' calendly.com *.calendly.com; frame-src 'self' calendly.com *.calendly.com; img-src 'self' data: calendly.com *.calendly.com;",
  }
};

module.exports = nextConfig;