import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Fractional Economist & SaaS/AI Strategist',
  description: 'Clear economics that accelerates SaaS growth.',
  openGraph: {
    title: 'Fractional Economist & SaaS/AI Strategist',
    description: 'Clear economics that accelerates SaaS growth.',
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
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BX0JPBNQ5K"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BX0JPBNQ5K');
          `,
        }} />
        {/* Cookie Consent CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
        {/* Cookie Consent JS */}
        <script defer src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"></script>
      </head>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* Cookie Consent Init */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load',function(){
              window.cookieconsent.initialise({
                palette:{popup:{background:'#222'},button:{background:'#6344ff'}},
                content:{message:'This site uses cookies for analytics.',dismiss:'Got it',link:'Learn more'},
                onInitialise: function(status){
                  if(status==='allow'){gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted'});}
                }
              });
            });
          `,
        }} />
      </body>
    </html>
  )
} 