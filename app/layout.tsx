import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/CookieConsent'
import { GTMScript } from '@/components/analytics/GTMScript'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Inkblot Crew | Quarterly Indie Romance Subscription Box',
  description: 'Discover indie romance with our curated quarterly subscription box. Books, bookish goodies, digital extras, and a passionate community.',
  keywords: ['indie romance', 'book subscription', 'romance books', 'book box', 'bookish gifts'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Inkblot Crew',
  },
  twitter: {
    card: 'summary_large_image',
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
        <GTMScript />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

