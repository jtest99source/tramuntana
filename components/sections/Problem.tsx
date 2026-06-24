import AnimatedSection from '@/components/ui/AnimatedSection'
import { em } from '@/lib/em'
import type { SectionProps } from '@/types'

export default function Problem({ dict }: SectionProps) {
  return (
    <AnimatedSection id="problem" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
          {dict.problem.line1}
          <br />
          {dict.problem.line2}
          <br />
          <em className="font-extrabold italic text-[var(--color-gold)]">{dict.problem.line3}</em>
        </h2>
        <div className="space-y-7 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">
          {dict.problem.body.map((paragraph) => (
            <p key={paragraph}>{em(paragraph)}</p>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
