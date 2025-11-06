const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.calendly.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      }
    ],
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,

  // Redirects for legacy URLs
  async redirects() {
    return [
      {
        source: '/cheatsheets',
        destination: '/cheat-sheets',
        permanent: true,
      },
      {
        source: '/templates',
        destination: '/wiki/pricing#quick-reference',
        permanent: true,
      },
    ]
  },

  // Webpack optimizations for static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  }
}

module.exports = withMDX(nextConfig) 