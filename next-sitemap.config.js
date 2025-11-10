/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sarahzou.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        allow: '/wiki/pricing/*',
      }
    ],
    additionalSitemaps: [
      'https://sarahzou.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different page types
    const priorities = {
      '/': 1.0,
      '/consulting': 0.9,
      '/about': 0.8,
      '/newsletter': 0.8,
      '/contact': 0.7,
      '/wiki/pricing': 0.9,
      '/consulting/services/pricing-monetization-sprint': 0.9,
      '/consulting/services/metrics-experimentation-sprint': 0.9,
      '/consulting/services/on-call-economist-retainer': 0.9,
    }
    
    const priority = priorities[path] || (path.startsWith('/consulting/services/') ? 0.8 : (path.startsWith('/wiki/pricing/') ? 0.8 : 0.5))
    
    return {
      loc: path,
      changefreq: path.startsWith('/newsletter/') ? 'weekly' : 'monthly',
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  }
} 