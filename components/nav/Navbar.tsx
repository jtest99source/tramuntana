'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { SectionProps } from '@/types'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Logo from '@/components/ui/Logo'

const navLinks = [
  ['#home', 0],
  ['#calculator', 1],
  ['https://mallorcaverified.com', 2],
] as const

export default function Navbar({ dict, lang }: SectionProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>('[data-mobile-menu] a, [data-mobile-menu] button')
      ).filter((element) => !element.hasAttribute('disabled'))

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocusedRef.current?.focus()
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-16 w-full bg-[var(--color-bg)] transition-colors ${
        scrolled || menuOpen ? 'border-b border-[var(--color-border)]' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="inline-flex items-center" onClick={closeMenu}>
          <Logo />
        </Link>

        <div className="md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-gold)]"
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`absolute left-0 top-2 h-px w-6 bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher activeLang={lang} />
          <a href="#contact" className="border border-[var(--color-gold)] px-5 py-2.5 font-[var(--font-body)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-wide)] text-[var(--color-gold)] transition-colors duration-150 hover:bg-[var(--color-gold)] hover:text-[var(--color-bg)]">
            {dict.nav.freeAudit}
          </a>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          data-mobile-menu
          className={`fixed inset-0 top-16 z-40 bg-[var(--color-bg)] px-6 py-8 ${
            reduceMotion ? '' : 'animate-[mobile-menu-in_180ms_ease-out_both]'
          } md:hidden`}
        >
          <div className="mx-auto flex h-full max-w-sm flex-col">
            <nav className="mt-16" aria-label="Mobile navigation">
              <ul className="space-y-8">
                {navLinks.map(([href, index]) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={closeMenu}
                      target={href.startsWith('https://') ? '_blank' : undefined}
                      rel={href.startsWith('https://') ? 'noreferrer' : undefined}
                      className="flex items-center gap-3 font-[var(--font-display)] text-[clamp(34px,10vw,52px)] font-semibold leading-none text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-gold)]"
                    >
                      {dict.footer.links[index]}
                      {href.startsWith('https://') ? (
                        <svg className="h-[0.55em] w-[0.55em] shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 space-y-8 border-t border-[var(--color-border)] pt-8">
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn btn-primary inline-flex w-full"
              >
                {dict.nav.freeAudit}
              </a>
              <div>
                <p className="label mb-3">{dict.nav.language}</p>
                <LanguageSwitcher activeLang={lang} className="gap-1" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
