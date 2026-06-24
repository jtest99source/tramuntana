import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLang, langs } from '@/lib/utils'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

type RouteProps = {
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = isLang(rawLang) ? rawLang : 'en'
  const dict = await getDictionary(lang)

  return {
    title: {
      default: dict.meta.title,
      template: '%s | Tramuntana Digital',
    },
    description: dict.meta.description,
    keywords: [
      'digital marketing Mallorca',
      'SEO Mallorca',
      'GEO search Mallorca',
      'hotel marketing Mallorca',
      'AI search optimisation Mallorca',
    ],
    openGraph: {
      type: 'website',
      siteName: 'Tramuntana Digital',
      locale: lang === 'en' ? 'en_GB' : lang === 'es' ? 'es_ES' : 'de_DE',
    },
    alternates: {
      canonical: 'https://tramuntanadigital.com',
      languages: {
        en: 'https://tramuntanadigital.com/en',
        es: 'https://tramuntanadigital.com/es',
        de: 'https://tramuntanadigital.com/de',
      },
    },
  }
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return children
}
