import AnimatedSection from '@/components/ui/AnimatedSection'
import FadeIn from '@/components/ui/FadeIn'
import type { SectionProps } from '@/types'

function normalizeServiceName(name: string) {
  return name.replace(/[＆﹠]/g, '&')
}

function renderServiceName(name: string) {
  const normalizedName = normalizeServiceName(name)
  const parts = normalizedName.split('&')

  if (parts.length === 1) return normalizedName

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 ? <span className="font-[Georgia,serif]">&amp;</span> : null}
      {part}
    </span>
  ))
}

export default function Services({ dict }: SectionProps) {
  return (
    <AnimatedSection id="services" className="-mt-1 rounded-t-[40px] bg-[var(--cream)] py-24 text-[var(--navy)] md:rounded-t-[60px] md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <span className="eyebrow text-[var(--gold)]">{dict.services.eyebrow}</span>
          <h2 className="max-w-[780px] font-[var(--font-display)] text-[clamp(42px,5.2vw,72px)] font-semibold leading-[1.05] text-[var(--navy)]">
            {dict.services.headline}
          </h2>
        </div>

        <div className="mt-14 border-t border-[rgba(14,34,51,0.15)] md:mt-28">
          {dict.services.rows.map(([name, description], index) => (
            <FadeIn
              key={name}
              delay={index * 0.08}
              className="group relative grid gap-2 border-b border-[rgba(14,34,51,0.15)] py-6 md:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] md:items-baseline md:gap-5 md:py-11"
            >
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-24" aria-hidden="true" />
              <h3 className="font-[var(--font-display)] [font-size:var(--text-h3)] font-semibold leading-tight text-[var(--navy)] transition-transform duration-300 group-hover:translate-x-2">{renderServiceName(name)}</h3>
              <p className="max-w-[62ch] font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.75] text-[rgba(14,34,51,0.72)]">{description}</p>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 max-w-[760px] font-[var(--font-body)] [font-size:var(--text-body-lg)] leading-[1.7] text-[rgba(14,34,51,0.78)] md:mt-12">{dict.services.note}</p>
      </div>
    </AnimatedSection>
  )
}
