import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { LanguageProvider } from '@/lib/language-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: {
    default: 'EZCENTIALS - Mode de Luxe & Fitness Premium',
    template: '%s | EZCENTIALS'
  },
  description: 'Découvrez EZCENTIALS, votre destination pour le luxe premium. Collections exclusives pour Homme, Femme et Fitness. Plus de 30 articles de haute qualité.',
  keywords: ['mode de luxe', 'fashion premium', 'fitness luxe', 'mode créateur', 'e-commerce', 'vêtements de luxe', 'haute couture'],
  authors: [{ name: 'EZCENTIALS' }],
  creator: 'EZCENTIALS',
  publisher: 'EZCENTIALS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ezcentials.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'EZCENTIALS - Mode de Luxe & Fitness Premium',
    description: 'Découvrez EZCENTIALS, votre destination pour le luxe premium. Collections exclusives pour Homme, Femme et Fitness.',
    siteName: 'EZCENTIALS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EZCENTIALS - Mode de Luxe & Fitness Premium',
    description: 'Découvrez EZCENTIALS, votre destination pour le luxe premium. Collections exclusives pour Homme, Femme et Fitness.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#f5e6d3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
