import AnimatedSection from '@/components/ui/AnimatedSection'
import Reveal from '@/components/ui/Reveal'
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
        <Reveal>
          <span className="eyebrow text-[var(--gold)]">{dict.services.eyebrow}</span>
          <h2 className="max-w-[780px] font-[var(--font-display)] text-[clamp(42px,5.2vw,72px)] font-semibold leading-[1.05] text-[var(--navy)]">
            {dict.services.headline}
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-[rgba(14,34,51,0.15)] md:mt-28">
          {dict.services.rows.map(([name, description], index) => (
            <Reveal
              key={name}
              delay={index * 100}
              className="group relative grid gap-3 border-b border-[rgba(14,34,51,0.15)] py-6 transition-colors duration-300 md:grid-cols-[4rem_minmax(260px,0.72fr)_minmax(0,1.28fr)_2rem] md:items-baseline md:gap-5 md:py-11 md:hover:bg-black/[0.03]"
            >
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-24" aria-hidden="true" />
              <span className="font-[var(--font-mono)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-caps)] text-[var(--gold)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-[var(--font-display)] [font-size:var(--text-h3)] font-semibold leading-tight text-[var(--navy)] transition-transform duration-300 md:group-hover:translate-x-2">{renderServiceName(name)}</h3>
              <p className="max-w-[62ch] font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.75] text-[rgba(14,34,51,0.72)]">{description}</p>
              <span className="hidden justify-self-end font-[var(--font-display)] text-2xl leading-none text-[var(--gold)] opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" aria-hidden="true">
                &rarr;
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 max-w-[760px] font-[var(--font-body)] [font-size:var(--text-body-lg)] leading-[1.7] text-[rgba(14,34,51,0.78)] md:mt-12">{dict.services.note}</p>
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
