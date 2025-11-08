/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sarahzou.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/consulting/services/price-change-comms-playbook',
    '/consulting/services/pricing-optimization-retainer',
    '/consulting/services/investor-updates-automation-kit',
    '/consulting/services/investor-monetization-pitch-kit',
    '/consulting/services/investor-deck-accelerator',
    '/consulting/services/runway-scenario-model',
    '/consulting/services/profitability-simulator',
    '/consulting/services/competitive-benchmark-insights',
    '/consulting/services/rapid-pricing-experiment-toolkit',
    '/consulting/services/value-based-monetization-design',
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
      '/consulting/services/saas-metrics-clarity-pack': 0.9,
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