import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { Inter, EB_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ConversionTracking from '@/components/ConversionTracking'
import { generateSiteEntityGraphJsonLd } from '@/lib/generateJsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})
// Headline serif. NOTE: loaded into the legacy '--font-playfair' variable so the
// 43 files referencing font-serif-playfair keep working — the font is EB Garamond.
const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

const CookieConsentBanner = dynamic(() => import('@/components/CookieConsentBanner'), {
  ssr: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sarahzou.com'),
  title:
    'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou',
  description:
    'Pricing, packaging, and unit-economics strategy for founders of AI-infrastructure, API, and data-platform companies (Seed–Series B). Start with a free one-page diagnostic note.',
  openGraph: {
    title:
      'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou',
    description:
      'Pricing, packaging, and unit-economics strategy for founders of AI-infrastructure, API, and data-platform companies (Seed–Series B). Start with a free one-page diagnostic note.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/images/econnova_icon.png" type="image/png" />
      </head>
      <body className="font-sans">
        {/* Normalize trailing slash URLs to canonical non-trailing form on GitHub Pages. */}
        <Script
          id="canonical-trailing-slash-redirect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var pathname = window.location.pathname || '/';
                if (pathname.length <= 1 || !pathname.endsWith('/')) return;
                var canonicalPath = pathname.replace(/\\/+$/, '');
                var target = canonicalPath + window.location.search + window.location.hash;
                window.location.replace(target);
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSiteEntityGraphJsonLd()),
          }}
        />
        {/* Load analytics as non-critical work to protect first paint/LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BX0JPBNQ5K"
          strategy="lazyOnload"
        />
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            gtag('config', 'G-BX0JPBNQ5K', { 'url_passthrough': true });
            gtag('config', 'AW-17632716336');
          `,
          }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <ConversionTracking />
        <CookieConsentBanner />
        <Footer />
      </body>
    </html>
  )
}
