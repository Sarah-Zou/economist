import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sarahzou.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    // Primary sitemap is Next.js app/sitemap.ts → out/sitemap.xml.
    // sitemap_index.xml is also emitted postbuild for legacy GSC submissions.
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap_index.xml`],
    host: baseUrl,
  }
}

