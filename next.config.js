/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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