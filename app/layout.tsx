import type { Metadata } from 'next'
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
  display: 'swap',
  preload: true,
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
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* Cookie Consent CSS - loaded asynchronously via script */}
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
        {/* Initialize Google Tag Manager with consent mode denied by default (GDPR compliant) */}
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // Set consent mode: grant analytics by default, deny ad features (GDPR compliant)
            // Analytics tracking is allowed without explicit consent in most jurisdictions
            // Ad features require explicit consent
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'granted',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `
        }} />
        {/* Load GA4 immediately with analytics_storage granted by default */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BX0JPBNQ5K"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            if(typeof gtag === 'function') {
              gtag('config', 'G-BX0JPBNQ5K', {
                'url_passthrough': true
              });
            }
          `
        }} />
        {/* Load Google Ads immediately with consent denied */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17632716336"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            if(typeof gtag === 'function') {
              gtag('config', 'AW-17632716336');
            }
          `
        }} />
        {/* Cookie Consent CSS - loaded asynchronously */}
        <Script id="cookie-consent-css" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css';
              document.head.appendChild(link);
            })();
          `
        }} />
        {/* Cookie Consent JS - afterInteractive to ensure it loads before init */}
        <Script
          src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
          strategy="afterInteractive"
        />
        {/* Cookie Consent Init - fallback if onLoad doesn't work */}
        <Script id="cookie-consent-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function initCookieConsent() {
              if(typeof window.cookieconsent !== 'undefined') {
                window.cookieconsent.initialise({
                  palette: {
                    popup: { background: '#222', text: '#fff' },
                    button: { background: '#6344ff', text: '#fff' }
                  },
                  theme: 'classic',
                  position: 'bottom',
                  type: 'opt-in',
                  content: {
                    message: 'This website uses cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.',
                    dismiss: 'Accept',
                    deny: 'Decline',
                    link: 'Learn more',
                    href: '/privacy'
                  },
                  onInitialise: function(status) {
                    if(status === 'allow') {
                      if(typeof gtag === 'function') {
                        gtag('consent', 'update', {
                          'ad_storage': 'granted',
                          'analytics_storage': 'granted',
                          'ad_user_data': 'granted',
                          'ad_personalization': 'granted'
                        });
                      }
                    } else if(status === 'deny') {
                      if(typeof gtag === 'function') {
                        // User explicitly denied - revoke ad features but keep basic analytics
                        gtag('consent', 'update', {
                          'ad_storage': 'denied',
                          'analytics_storage': 'granted',
                          'ad_user_data': 'denied',
                          'ad_personalization': 'denied'
                        });
                      }
                    }
                    // If no interaction, analytics_storage remains granted (default)
                  },
                  onStatusChange: function(status) {
                    if(status === 'allow') {
                      if(typeof gtag === 'function') {
                        gtag('consent', 'update', {
                          'ad_storage': 'granted',
                          'analytics_storage': 'granted',
                          'ad_user_data': 'granted',
                          'ad_personalization': 'granted'
                        });
                      }
                    } else if(status === 'deny') {
                      if(typeof gtag === 'function') {
                        // User explicitly denied - revoke ad features but keep basic analytics
                        gtag('consent', 'update', {
                          'ad_storage': 'denied',
                          'analytics_storage': 'granted',
                          'ad_user_data': 'denied',
                          'ad_personalization': 'denied'
                        });
                      }
                    }
                  },
                  onRevokeChoice: function() {
                    if(typeof gtag === 'function') {
                      // When user revokes, keep analytics but deny ad features
                      gtag('consent', 'update', {
                        'ad_storage': 'denied',
                        'analytics_storage': 'granted',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied'
                      });
                    }
                  }
                });
              } else {
                // Retry after a short delay if library isn't loaded yet
                setTimeout(initCookieConsent, 100);
              }
            })();
          `
        }} />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 