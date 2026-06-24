import AnimatedSection from '@/components/ui/AnimatedSection'
import { em } from '@/lib/em'
import type { SectionProps } from '@/types'

export default function WhyTramuntana({ dict }: SectionProps) {
  return (
    <AnimatedSection id="why" className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
        <div>
          <span className="gold-rule" aria-hidden="true" />
          <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
            {dict.why.headline}
          </h2>
          <div className="mt-10 space-y-7 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">
            {dict.why.body.map((paragraph) => (
              <p key={paragraph}>{em(paragraph)}</p>
            ))}
          </div>
        </div>
        <ul>
          {dict.why.differentiators.map((item) => (
            <li key={item} className="mb-4 flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-[var(--font-mono)] text-[var(--color-gold)]" aria-hidden="true">-&gt;</span>
              <span className="font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
