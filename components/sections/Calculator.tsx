'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import type { SectionProps, VisibilityResult } from '@/types'

const descriptorFallback: Record<string, Record<string, string>> = {
  en: { Critical: 'Critical', Low: 'Low visibility', Moderate: 'Moderate visibility', Good: 'Good visibility', Strong: 'Strong visibility' },
  es: { Critical: 'Crítica', Low: 'Visibilidad baja', Moderate: 'Visibilidad moderada', Good: 'Buena visibilidad', Strong: 'Visibilidad fuerte' },
  de: { Critical: 'Kritisch', Low: 'Geringe Sichtbarkeit', Moderate: 'Moderate Sichtbarkeit', Good: 'Gute Sichtbarkeit', Strong: 'Starke Sichtbarkeit' },
}

const backLabel: Record<string, string> = { en: '← Back', es: '← Volver', de: '← Zurück' }

export default function Calculator({ dict, lang }: SectionProps) {
  const [loading, setLoading] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [result, setResult] = useState<VisibilityResult | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading) return
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % dict.calculator.loading.length)
    }, 1100)
    return () => window.clearInterval(timer)
  }, [dict.calculator.loading.length, loading])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    setMessageIndex(0)

    const formData = new FormData(event.currentTarget)
    const payload = {
      businessName: String(formData.get('businessName') || ''),
      websiteUrl: String(formData.get('websiteUrl') || ''),
      sector: String(formData.get('sector') || ''),
      lang,
    }

    try {
      const response = await fetch('/api/visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Request failed')
      setResult(data)
    } catch {
      setError(dict.calculator.error)
    } finally {
      setLoading(false)
    }
  }

  function handleBack() {
    setResult(null)
    setError('')
  }

  const metrics = result
    ? [
        ['googlePresence', dict.calculator.metrics.googlePresence, result.metrics.googlePresence],
        ['aiSearchVisibility', dict.calculator.metrics.aiSearchVisibility, result.metrics.aiSearchVisibility],
        ['onlineReputation', dict.calculator.metrics.onlineReputation, result.metrics.onlineReputation],
      ] as const
    : []

  const showResult = !!result || !!error

  return (
    <AnimatedSection id="calculator" className="border-y border-[var(--color-border-accent)] bg-[var(--color-gold-bg)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">{dict.calculator.eyebrow}</span>
          <h2 className="max-w-[420px] font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
            {dict.calculator.headline}
          </h2>
          <p className="mt-3 max-w-[380px] font-[var(--font-body)] [font-size:var(--text-sm)] leading-[1.65] text-[var(--color-text-secondary)]">{dict.calculator.subheadline}</p>
        </div>

        <div className="border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.42)] md:p-8">
          {showResult ? (
            <div className="fade-in">
              <button
                onClick={handleBack}
                className="mb-6 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-secondary)]"
              >
                {backLabel[lang] ?? '← Back'}
              </button>

              {error ? (
                <div>
                  <p className="font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">{error}</p>
                  <a href="#contact" className="btn btn-primary mt-6 inline-flex w-full">
                    {dict.calculator.cta}
                  </a>
                </div>
              ) : result ? (
                <div>
                  <ScoreDisplay
                    score={result.overallScore}
                    descriptor={descriptorFallback[lang][result.descriptor] || result.descriptor}
                  />
                  <div className="mt-8 space-y-5">
                    {metrics.map(([key, label, score], index) => (
                      <div key={key}>
                        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                          <span className="text-[var(--color-text-primary)]">{label}</span>
                          <span className="font-[var(--font-mono)] text-[var(--color-text-secondary)]">{score}/10</span>
                        </div>
                        <div className="h-[3px] bg-[var(--color-border)]">
                          <div
                            className="h-[3px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
                            style={{ width: `${score * 10}%`, transitionDelay: `${index * 120}ms` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">{result.narrative}</p>
                  <a href="#contact" className="btn btn-primary mt-8 inline-flex w-full">
                    {dict.calculator.cta}
                  </a>
                  <p className="mt-5 [font-size:var(--text-sm)] leading-6 text-[var(--color-text-tertiary)]">{dict.calculator.disclaimer}</p>
                </div>
              ) : null}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="label" htmlFor="businessName">
                  {dict.calculator.fields.businessName}
                </label>
                <input id="businessName" name="businessName" required className="input-field" />
              </div>
              <div>
                <label className="label" htmlFor="websiteUrl">
                  {dict.calculator.fields.websiteUrl}
                </label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  className="input-field"
                  placeholder={dict.calculator.fields.websitePlaceholder}
                />
              </div>
              <div>
                <label className="label" htmlFor="sector">
                  {dict.calculator.fields.sector}
                </label>
                <select
                  id="sector"
                  name="sector"
                  required
                  className="input-field cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888884' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                  }}
                >
                  {dict.calculator.sectors.map((sector) => (
                    <option key={sector} style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-primary)' }}>{sector}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? dict.calculator.loading[messageIndex] : dict.calculator.submit}
              </button>
              <p className="pt-2 [font-size:var(--text-sm)] leading-6 text-[var(--color-text-tertiary)]">{dict.calculator.disclaimer}</p>
            </form>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}
