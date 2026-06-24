import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/nav/Navbar'
import Calculator from '@/components/sections/Calculator'
import ContactCTA from '@/components/sections/ContactCTA'
import Hero from '@/components/sections/Hero'
import MallorcaVerified from '@/components/sections/MallorcaVerified'
import Problem from '@/components/sections/Problem'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import WhyTramuntana from '@/components/sections/WhyTramuntana'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLang } from '@/lib/utils'

type PageProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  if (!isLang(rawLang)) return {}
  const dict = await getDictionary(rawLang)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${rawLang}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        es: `${process.env.NEXT_PUBLIC_SITE_URL}/es`,
        de: `${process.env.NEXT_PUBLIC_SITE_URL}/de`,
      },
    },
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { lang: rawLang } = await params
  if (!isLang(rawLang)) notFound()

  const dict = await getDictionary(rawLang)

  return (
    <>
      <Navbar dict={dict} lang={rawLang} />
      <main>
        <Hero dict={dict} lang={rawLang} />
        <Problem dict={dict} lang={rawLang} />
        <Services dict={dict} lang={rawLang} />
        <Calculator dict={dict} lang={rawLang} />
        <WhyTramuntana dict={dict} lang={rawLang} />
        <Testimonials dict={dict} lang={rawLang} />
        <MallorcaVerified dict={dict} lang={rawLang} />
        <ContactCTA dict={dict} lang={rawLang} />
      </main>
      <Footer dict={dict} lang={rawLang} />
    </>
  )
}
