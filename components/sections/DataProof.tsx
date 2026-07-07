'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Reveal, { useOnceInView } from '@/components/ui/Reveal'
import type { SectionProps } from '@/types'

type DataProofStat = {
  value: string
  target: number
  decimals: number
  suffix: string
  label: string
}

function DataProofStat({ stat, delay, locale }: { stat: DataProofStat; delay: number; locale: string }) {
  const animationFrame = useRef<number | null>(null)
  const { ref, isInView, prefersReducedMotion } = useOnceInView<HTMLDivElement>()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(stat.target)
      return
    }

    if (!isInView) return

    const duration = 1200
    const startedAt = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(stat.target * eased)
      if (progress < 1) {
        animationFrame.current = window.requestAnimationFrame(tick)
      }
    }

    animationFrame.current = window.requestAnimationFrame(tick)

    return () => {
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current)
    }
  }, [isInView, prefersReducedMotion, stat.target])

  const formattedValue = prefersReducedMotion || displayValue === stat.target
    ? stat.value
    : `${displayValue.toLocaleString(locale, {
        maximumFractionDigits: stat.decimals,
        minimumFractionDigits: stat.decimals,
      })}${stat.suffix}`

  return (
    <Reveal delay={delay} className="border-t border-[rgba(227,179,65,0.22)] pt-7 md:border-t-0 md:border-l md:pl-8">
      <div ref={ref}>
        <p className="font-[var(--font-display)] text-[clamp(54px,7vw,92px)] font-semibold leading-none text-[var(--color-text-primary)]">
          {formattedValue}
        </p>
        <p className="mt-4 font-[var(--font-mono)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-tertiary)]">
          {stat.label}
        </p>
      </div>
    </Reveal>
  )
}

const statLocales = {
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
}

export default function DataProof({ dict, lang }: SectionProps) {
  return (
    <AnimatedSection id="data-proof" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-[840px]">
          <span className="eyebrow text-[var(--color-gold)]">{dict.dataProof.eyebrow}</span>
          <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            {dict.dataProof.headline}
          </h2>
          <p className="mt-7 max-w-[720px] font-[var(--font-body)] [font-size:var(--text-body-lg)] leading-[1.72] text-[var(--color-text-secondary)]">
            {dict.dataProof.body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-9 md:mt-20 md:grid-cols-3 md:gap-0">
          {dict.dataProof.stats.map((stat, index) => (
            <DataProofStat key={stat.label} stat={stat} delay={index * 100} locale={statLocales[lang]} />
          ))}
        </div>

        <Reveal delay={200}>
          <a
            href="https://mallorcaverified.com"
            target="_blank"
            rel="noreferrer"
            className="mt-14 inline-flex font-[var(--font-body)] font-medium text-[var(--color-gold)] transition-colors duration-150 hover:text-[var(--color-gold-light)]"
          >
            {dict.dataProof.cta}
          </a>
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
