import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { generateOrganizationProfessionalServiceJsonLd } from '@/lib/generateJsonLd'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'optional',
  preload: false,
})

const CookieConsentBanner = dynamic(() => import('@/components/CookieConsentBanner'), {
  ssr: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sarahzou.com'),
  title: 'Fractional Chief Economist for Seed–Series A Tech | Sarah Zou',
  description: 'Pricing, value metric, and metrics strategy for SaaS, APIs & AI. Lift NRR, improve payback, and ship investor-grade monetization. PhD economist for early-stage startups.',
  openGraph: {
    title: 'Fractional Chief Economist for Seed–Series A Tech | Sarah Zou',
    description: 'Pricing, value metric, and metrics strategy for SaaS, APIs & AI. Lift NRR, improve payback, and ship investor-grade monetization. PhD economist for early-stage startups.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/images/EconNova_icon.png" type="image/png" />
      </head>
      <body className="font-sans">
        {/* Person Schema for SEO - added to all pages for disambiguation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sarah Zou",
              "honorificSuffix": "PhD",
              "jobTitle": "Fractional Chief Economist",
              "url": "https://sarahzou.com/about",
              "sameAs": ["https://www.linkedin.com/in/drsarahzou"],
              "worksFor": {
                "@type": "Organization",
                "name": "EconNova Consulting",
                "url": "https://sarahzou.com"
              },
              "knowsAbout": ["Pricing", "Monetization", "Unit Economics", "Experimentation", "Econometrics"]
            })
          }}
        />
        {/* Organization / ProfessionalService schema site-wide (footer entity) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationProfessionalServiceJsonLd())
          }}
        />
        {/* Load analytics as non-critical work to protect first paint/LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BX0JPBNQ5K"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'granted',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            gtag('config', 'G-BX0JPBNQ5K', { 'url_passthrough': true });
            gtag('config', 'AW-17632716336');
          `
        }} />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <CookieConsentBanner />
        <Footer />
      </body>
    </html>
  )
} 