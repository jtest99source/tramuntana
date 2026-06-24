import AnimatedSection from '@/components/ui/AnimatedSection'
import type { SectionProps } from '@/types'

export default function MallorcaVerified({ dict }: SectionProps) {
  return (
    <AnimatedSection id="mallorca-verified" className="border-t border-[var(--color-gold)] bg-[var(--color-surface)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <span className="eyebrow">{dict.mallorcaVerified.eyebrow}</span>
          <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
            {dict.mallorcaVerified.headline}
          </h2>
          <div className="mt-10 space-y-7 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">
            {dict.mallorcaVerified.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href="https://mallorcaverified.com"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex font-[var(--font-body)] font-medium text-[var(--color-gold)] transition-colors duration-150 hover:text-[var(--color-gold-light)]"
          >
            {dict.mallorcaVerified.cta}
          </a>
        </div>
        <div className="self-center rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
          <p className="label">{dict.mallorcaVerified.card.badge}</p>
          <h3 className="mt-6 font-[var(--font-display)] [font-size:var(--text-h3)] font-semibold text-[var(--color-text-primary)]">
            {dict.mallorcaVerified.card.name}
          </h3>
          <p className="mt-1 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-secondary)]">{dict.mallorcaVerified.card.location}</p>
          <p className="mt-1 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-secondary)]">{dict.mallorcaVerified.card.sector}</p>
          <p className="mt-3 font-[var(--font-mono)] [font-size:var(--text-xs)] text-[var(--color-gold)]">
            {dict.mallorcaVerified.card.rating}
            <span className="ml-2 text-[var(--color-text-secondary)]">{dict.mallorcaVerified.card.reviews}</span>
          </p>
          <div className="mt-8 border-t border-[var(--color-border)] pt-8">
            <div className="flex items-end gap-3">
              <span className="font-[var(--font-mono)] text-[64px] font-medium leading-none text-[var(--color-gold)]">{dict.mallorcaVerified.card.score}</span>
              <span className="pb-2 font-[var(--font-mono)] [font-size:var(--text-sm)] text-[var(--color-text-tertiary)]">/100</span>
            </div>
            <p className="mt-4 font-[var(--font-mono)] [font-size:var(--text-xs)] text-[var(--color-gold-muted)]">{dict.mallorcaVerified.card.label}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
