import { DM_Mono, DM_Sans, Fraunces } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: 'Tramuntana Digital',
    description:
      'Digital marketing agency in Mallorca specialising in SEO, GEO/AI search optimisation and full-service digital marketing for luxury and internationally-oriented businesses.',
    url: 'https://tramuntanadigital.com',
    areaServed: {
      '@type': 'Place',
      name: 'Mallorca, Balearic Islands, Spain',
    },
    serviceType: [
      'SEO',
      'GEO optimisation',
      'AI search optimisation',
      'Social media management',
      'Web design',
      'Marketing automation',
    ],
    inLanguage: ['en', 'es', 'de'],
  }

  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
