/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' assets.calendly.com; connect-src 'self' calendly.com *.calendly.com; frame-src 'self' calendly.com *.calendly.com; img-src 'self' data: blob: calendly.com *.calendly.com; style-src 'self' 'unsafe-inline' assets.calendly.com;",
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' assets.calendly.com api.calendly.com; connect-src 'self' calendly.com *.calendly.com api.openai.com; frame-src 'self' calendly.com *.calendly.com assets.calendly.com; img-src 'self' data: blob: calendly.com *.calendly.com; style-src 'self' 'unsafe-inline' assets.calendly.com; worker-src 'self' blob:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;