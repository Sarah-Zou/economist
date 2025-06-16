/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Personal_Website_6th',
  assetPrefix: '/Personal_Website_6th/',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.calendly.com',
      }
    ],
    unoptimized: true
  },
  trailingSlash: true,
}

module.exports = nextConfig 