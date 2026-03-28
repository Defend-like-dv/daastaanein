import type { Metadata } from 'next'
import { Playfair_Display, Jost, Crimson_Pro } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default: 'Daastaanein — The Untold Stories of Music',
    template: '%s | Daastaanein',
  },
  description:
    'Stories behind Hindi songs. The heartbreak, the genius, the moments that made music eternal. जो गाने हम सुनते हैं, उनकी अनकही कहानियाँ।',
  keywords: ['hindi songs', 'bollywood music stories', 'story behind songs', 'hindi music history'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Daastaanein',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${jost.variable} ${crimsonPro.variable}`}
    >
      <body>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
