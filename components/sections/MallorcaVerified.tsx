'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import CountUpScore from '@/components/ui/CountUpScore'
import Reveal from '@/components/ui/Reveal'
import type { SectionProps } from '@/types'

function ctaWithoutArrow(label: string) {
  return label.replace(/\s*(?:â†’|Ã¢â€ â€™)\s*$/, '')
}

export default function MallorcaVerified({ dict }: SectionProps) {
  return (
    <AnimatedSection id="mallorca-verified" className="overflow-hidden border-t border-[rgba(227,179,65,0.28)] bg-[var(--color-bg)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{dict.mallorcaVerified.eyebrow}</span>
          <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.12] text-[var(--color-text-primary)]">
            {dict.mallorcaVerified.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal delay={100}>
            <div className="max-w-[58ch] space-y-7 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.75] text-[var(--color-text-secondary)]">
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
              {ctaWithoutArrow(dict.mallorcaVerified.cta)}
              <span aria-hidden="true">&nbsp;→</span>
            </a>
          </Reveal>

          <div className="relative grid gap-5 md:block md:min-h-[520px] md:pt-9">
            <div
              className="aspect-[4/3] w-full rounded-[20px] bg-cover bg-[position:center_center] shadow-[0_34px_120px_rgba(0,0,0,0.45)] md:absolute md:bottom-0 md:left-0 md:h-[78%] md:w-[80%]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(12,12,12,0.02), rgba(12,12,12,0.36)), url('/images/balm-restaurant.jpg')",
              }}
              aria-hidden="true"
            />
            <Reveal delay={200} className="w-full rounded-2xl border border-[rgba(227,179,65,0.28)] bg-[#141414] p-6 text-[var(--color-text-primary)] shadow-[0_24px_50px_rgba(0,0,0,0.6)] backdrop-blur md:absolute md:right-0 md:top-0 md:w-[66%] md:p-7">
              <p className="font-[var(--font-mono)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-caps)] text-[var(--gold)]">{dict.mallorcaVerified.card.badge}</p>
              <h3 className="mt-5 whitespace-nowrap font-[var(--font-display)] text-[clamp(24px,2vw,30px)] font-semibold leading-tight text-[var(--color-text-primary)]">
                {dict.mallorcaVerified.card.name}
              </h3>
              <p className="mt-2 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[rgba(215,226,234,0.62)]">{dict.mallorcaVerified.card.location}</p>
              <p className="mt-1 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[rgba(215,226,234,0.62)]">{dict.mallorcaVerified.card.sector}</p>
              <p className="mt-4 font-[var(--font-mono)] [font-size:var(--text-xs)] text-[var(--gold)]">
                {dict.mallorcaVerified.card.rating}
                <span className="ml-2 text-[rgba(215,226,234,0.62)]">{dict.mallorcaVerified.card.reviews}</span>
              </p>
              <CountUpScore score={Number(dict.mallorcaVerified.card.score)} className="mt-7 border-t border-[rgba(227,179,65,0.2)] pt-7" />
              <p className="mt-4 font-[var(--font-mono)] [font-size:var(--text-xs)] text-[rgba(215,226,234,0.62)]">{dict.mallorcaVerified.card.label}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
