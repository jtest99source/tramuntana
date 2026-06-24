import type { SectionProps } from '@/types'

export default function Hero({ dict }: SectionProps) {
  return (
    <section id="home" className="hero-grid relative flex min-h-screen items-center overflow-hidden bg-[var(--color-bg)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:py-32">
        <span className="eyebrow">{dict.hero.eyebrow}</span>
        <span className="gold-rule" aria-hidden="true" />
        <h1 className="max-w-[820px] font-[var(--font-display)] [font-size:var(--text-hero)] font-bold leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-[var(--color-text-primary)]">
          {dict.hero.line1}
          <br />
          {dict.hero.line2}
          <br />
          {dict.hero.line3}
          <br />
          {dict.hero.line4}{' '}
          <em className="font-extrabold italic text-[var(--color-gold)]">{dict.hero.emphasis}</em>.
        </h1>
        <p className="mt-8 max-w-[520px] font-[var(--font-body)] [font-size:var(--text-body-lg)] leading-[1.65] text-[var(--color-text-secondary)]">{dict.hero.subheadline}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#calculator" className="btn btn-primary w-full sm:w-auto">
            {dict.hero.primaryCta}
          </a>
          <a href="#contact" className="btn btn-secondary w-full sm:w-auto">
            {dict.hero.secondaryCta}
          </a>
        </div>
      </div>
      <a
        href="#problem"
        aria-label="Scroll"
        className="scroll-bounce absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[var(--color-text-secondary)] md:block"
      >
        <span className="block h-4 w-4 rotate-45 border-b border-r border-current" />
      </a>
    </section>
  )
}
