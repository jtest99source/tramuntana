import AnimatedSection from '@/components/ui/AnimatedSection'
import Reveal from '@/components/ui/Reveal'
import { em } from '@/lib/em'
import type { SectionProps } from '@/types'

export default function WhyTramuntana({ dict }: SectionProps) {
  return (
    <AnimatedSection id="why" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
        <Reveal>
          <span className="gold-rule" aria-hidden="true" />
          <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
            {dict.why.headline}
          </h2>
          <div className="mt-10 space-y-7 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.75] text-[var(--color-text-secondary)]">
            {dict.why.body.map((paragraph) => (
              <p key={paragraph}>{em(paragraph)}</p>
            ))}
          </div>
        </Reveal>
        <ul className="space-y-6">
          {dict.why.differentiators.map((item, index) => (
            <Reveal key={item} as="li" delay={index * 100} className="flex items-start gap-4">
              <span className="mt-0.5 w-8 shrink-0 text-right font-[var(--font-mono)] text-[var(--color-gold)]" aria-hidden="true">-&gt;</span>
              <span className="font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">
                {item}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
