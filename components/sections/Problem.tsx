import AnimatedSection from '@/components/ui/AnimatedSection'
import FadeIn from '@/components/ui/FadeIn'
import { em } from '@/lib/em'
import type { SectionProps } from '@/types'

export default function Problem({ dict }: SectionProps) {
  return (
    <AnimatedSection id="problem" className="bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <FadeIn>
          <h2 className="font-[var(--font-display)] text-[clamp(40px,4.8vw,68px)] font-semibold leading-[1.05] text-[var(--color-text-primary)]">
            {dict.problem.line1}
            <br />
            {dict.problem.line2}
            <br />
            <em className="font-extrabold italic text-[var(--color-gold)]">{dict.problem.line3}</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="max-w-[52ch] space-y-7 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.78] text-[var(--color-text-secondary)]">
            {dict.problem.body.map((paragraph) => (
              <p key={paragraph}>{em(paragraph)}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </AnimatedSection>
  )
}
