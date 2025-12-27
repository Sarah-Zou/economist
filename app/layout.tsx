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
        {/* Google Analytics 4 - afterInteractive strategy for non-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BX0JPBNQ5K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BX0JPBNQ5K');
          `}
        </Script>
        {/* Google tag (gtag.js) - afterInteractive strategy */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17632716336"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17632716336');
          `}
        </Script>
        {/* Cookie Consent CSS - loaded asynchronously */}
        <Script id="cookie-consent-css" strategy="lazyOnload">
          {`
            (function() {
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css';
              document.head.appendChild(link);
            })();
          `}
        </Script>
        {/* Cookie Consent JS - lazyOnload for non-critical */}
        <Script
          src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
          strategy="lazyOnload"
        />
        {/* Cookie Consent Init - lazyOnload */}
        <Script id="cookie-consent-init" strategy="lazyOnload">
          {`
            window.addEventListener('load',function(){
              if(window.cookieconsent) {
                window.cookieconsent.initialise({
                  palette:{popup:{background:'#222'},button:{background:'#6344ff'}},
                  content:{message:'This site uses cookies for analytics.',dismiss:'Got it',link:'Learn more'},
                  onInitialise: function(status){
                    if(status==='allow'){gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted'});}
                  }
                });
              }
            });
          `}
        </Script>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 