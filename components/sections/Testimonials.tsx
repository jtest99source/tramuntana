import AnimatedSection from '@/components/ui/AnimatedSection'
import type { SectionProps } from '@/types'

export default function Testimonials({ dict }: SectionProps) {
  return (
    <AnimatedSection id="testimonials" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto flex max-w-[680px] flex-col px-6">
        {dict.testimonials.map((testimonial, index) => (
          <article key={testimonial.name}>
            {index > 0 ? <div className="my-12 border-t border-[var(--color-border)]" /> : null}
            <blockquote className="max-w-[580px]">
              <span className="mb-3 block select-none font-[var(--font-display)] text-[2.5em] leading-none text-[var(--color-gold)]" aria-hidden="true">&ldquo;</span>
              <p className="font-[var(--font-display)] text-[clamp(18px,2vw,24px)] font-normal italic leading-[1.45] text-[var(--color-text-primary)]">{testimonial.quote}</p>
            </blockquote>
            <p className="mt-5 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-gold)]">{testimonial.name}</span> / {testimonial.role}
            </p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  )
}
