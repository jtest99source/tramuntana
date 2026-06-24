'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SectionProps } from '@/types'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function Navbar({ dict, lang }: SectionProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-16 w-full bg-[var(--color-bg)]/90 backdrop-blur-sm transition-colors ${
        scrolled ? 'border-b border-[var(--color-border)]' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="flex items-baseline gap-3">
          <span className="flex flex-col leading-none">
            <span className="font-[var(--font-display)] text-xl font-bold tracking-[var(--tracking-tight)] text-[var(--color-text-primary)]">Tramuntana</span>
            <span className="mt-0.5 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-gold)]">Digital</span>
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <LanguageSwitcher activeLang={lang} className="hidden sm:flex" />
          <a href="#contact" className="border border-[var(--color-gold)] px-5 py-2.5 font-[var(--font-body)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-wide)] text-[var(--color-gold)] transition-colors duration-150 hover:bg-[var(--color-gold)] hover:text-[var(--color-bg)]">
            {dict.nav.freeAudit}
          </a>
        </div>
      </div>
    </header>
  )
}
