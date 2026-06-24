import Link from 'next/link'
import type { Lang } from '@/lib/i18n/dictionaries'
import { langs } from '@/lib/utils'

type LanguageSwitcherProps = {
  activeLang: Lang
  className?: string
}

export default function LanguageSwitcher({ activeLang, className = '' }: LanguageSwitcherProps) {
  return (
    <div className={`flex items-center gap-3 font-[var(--font-mono)] [font-size:var(--text-xs)] font-medium tracking-[var(--tracking-wide)] ${className}`}>
      {langs.map((lang) => (
        <Link
          key={lang}
          href={`/${lang}`}
          className={`border-b pb-1 uppercase transition-colors ${
            activeLang === lang
              ? 'border-[var(--color-text-primary)] text-[var(--color-text-primary)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          {lang}
        </Link>
      ))}
    </div>
  )
}
