/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sarahzou.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
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
      '/consulting/services/pricing-diagnostic-revenue-boost': 0.9,
      '/consulting/services/rapid-pricing-experiment-toolkit': 0.9,
      '/consulting/services/pricing-optimization-retainer': 0.9,
    }
    
    const priority = priorities[path] || (path.startsWith('/consulting/services/') ? 0.8 : 0.5)
    
    return {
      loc: path,
      changefreq: path.startsWith('/newsletter/') ? 'weekly' : 'monthly',
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  }
} 