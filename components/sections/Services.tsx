import AnimatedSection from '@/components/ui/AnimatedSection'
import type { SectionProps } from '@/types'

export default function Services({ dict }: SectionProps) {
  return (
    <AnimatedSection id="services" className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--space-xl)]">
      <div className="mx-auto max-w-6xl px-6">
        <span className="eyebrow">{dict.services.eyebrow}</span>
        <h2 className="max-w-[560px] font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
          {dict.services.headline}
        </h2>
        <div className="mt-16">
          {dict.services.rows.map(([name, description]) => (
            <div
              key={name}
              className="group flex flex-col gap-3 border-b border-[var(--color-border)] py-5 transition-colors duration-150 first:border-t hover:bg-[var(--color-surface-raised)] md:flex-row md:items-baseline md:gap-6 md:px-3"
            >
              <h3 className="min-w-[200px] font-[var(--font-body)] [font-size:var(--text-body-lg)] font-semibold text-[var(--color-text-primary)] transition-colors duration-150 group-hover:text-[var(--color-gold)]">{name}</h3>
              <p className="font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">{description}</p>
              <span className="ml-auto hidden font-[var(--font-mono)] text-[var(--color-gold-muted)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 md:inline" aria-hidden="true">-&gt;</span>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">{dict.services.note}</p>
      </div>
    </AnimatedSection>
  )
}
