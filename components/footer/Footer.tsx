import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import type { SectionProps } from '@/types'

const linkClass =
  'font-[var(--font-body)] [font-size:var(--text-sm)] text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[var(--color-text-primary)]'

const metaClass = 'font-[var(--font-mono)] [font-size:var(--text-xs)] text-[var(--color-text-tertiary)]'

export default function Footer({ dict, lang }: SectionProps) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] pb-10 pt-[var(--space-lg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div>
          <h2 className="label">{dict.footer.navigation}</h2>
          <ul className="mt-5 space-y-3">
            <li><a href="#home" className={linkClass}>{dict.footer.links[0]}</a></li>
            <li><a href="#calculator" className={linkClass}>{dict.footer.links[1]}</a></li>
            <li><a href="#mallorca-verified" className={linkClass}>{dict.footer.links[2]} -&gt;</a></li>
            <li><a href="#contact" className={linkClass}>{dict.footer.links[3]}</a></li>
          </ul>
          <LanguageSwitcher activeLang={lang} className="mt-8 sm:hidden" />
        </div>
        <div>
          <h2 className="label">{dict.footer.social}</h2>
          <ul className="mt-5 space-y-3">
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" className={linkClass}>Instagram</a></li>
          </ul>
        </div>
        <div>
          <h2 className="label">{dict.footer.contact}</h2>
          <ul className="mt-5 space-y-3">
            <li><a href="mailto:hello@tramuntanadigital.com" className={linkClass}>hello@tramuntanadigital.com</a></li>
            <li className={metaClass}>{dict.footer.location}</li>
          </ul>
        </div>
        <div>
          <h2 className="label">{dict.footer.legal}</h2>
          <ul className="mt-5 space-y-3">
            <li><a href={`/${lang}/privacy`} className={linkClass}>{dict.footer.privacy}</a></li>
            <li className={metaClass}>{dict.footer.copyright}</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 overflow-hidden px-6 select-none pointer-events-none" aria-hidden="true">
        <span className="font-[var(--font-display)] text-[clamp(40px,8vw,100px)] font-extrabold leading-none tracking-[-0.02em] text-[var(--color-surface-raised)]">
          Tramuntana
        </span>
      </div>
    </footer>
  )
}
