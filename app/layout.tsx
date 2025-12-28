import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  title: 'Sarah Zou | Economist for Early-Stage Tech',
  description: 'Pricing & metrics strategy for early-stage tech founders—data-driven insights from PhD economist Sarah Zou.',
  openGraph: {
    title: 'Sarah Zou | Economist for Early-Stage Tech',
    description: 'Pricing & metrics strategy for early-stage tech founders—data-driven insights from PhD economist Sarah Zou.',
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
        {/* Initialize Google Tag Manager with consent mode denied by default (GDPR compliant) */}
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // Set consent mode to denied by default (GDPR compliant)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
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
                          'analytics_storage': 'granted'
                        });
                      }
                      loadAnalytics();
                    } else if(status === 'deny') {
                      if(typeof gtag === 'function') {
                        gtag('consent', 'update', {
                          'ad_storage': 'denied',
                          'analytics_storage': 'denied'
                        });
                      }
                    }
                  },
                  onStatusChange: function(status) {
                    if(status === 'allow') {
                      if(typeof gtag === 'function') {
                        gtag('consent', 'update', {
                          'ad_storage': 'granted',
                          'analytics_storage': 'granted'
                        });
                      }
                      loadAnalytics();
                    } else if(status === 'deny') {
                      if(typeof gtag === 'function') {
                        gtag('consent', 'update', {
                          'ad_storage': 'denied',
                          'analytics_storage': 'denied'
                        });
                      }
                    }
                  },
                  onRevokeChoice: function() {
                    if(typeof gtag === 'function') {
                      gtag('consent', 'update', {
                        'ad_storage': 'denied',
                        'analytics_storage': 'denied'
                      });
                    }
                  }
                });
              } else {
                // Retry after a short delay if library isn't loaded yet
                setTimeout(initCookieConsent, 100);
              }
              
              function loadAnalytics() {
                // Only load analytics scripts if they haven't been loaded yet
                if(document.getElementById('google-analytics-script')) return;
                
                // Load Google Analytics 4
                var gaScript = document.createElement('script');
                gaScript.async = true;
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-BX0JPBNQ5K';
                gaScript.id = 'google-analytics-script';
                document.head.appendChild(gaScript);
                
                // Initialize Google Analytics
                if(typeof gtag === 'function') {
                  gtag('config', 'G-BX0JPBNQ5K');
                }
                
                // Load Google Ads
                var adsScript = document.createElement('script');
                adsScript.async = true;
                adsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17632716336';
                adsScript.id = 'google-ads-script';
                document.head.appendChild(adsScript);
                
                // Initialize Google Ads
                if(typeof gtag === 'function') {
                  gtag('config', 'AW-17632716336');
                }
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