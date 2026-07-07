'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CountUpScore from '@/components/ui/CountUpScore'
import Reveal from '@/components/ui/Reveal'
import type { SectionProps, VisibilityResult } from '@/types'

const shortWebsitePlaceholder: Record<string, string> = {
  en: 'yourwebsite.com',
  es: 'tuweb.com',
  de: 'ihrewebsite.com',
}

type SubmittedBusiness = {
  businessName: string
  websiteUrl: string
}

export default function Calculator({ dict, lang }: SectionProps) {
  const [loading, setLoading] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [result, setResult] = useState<VisibilityResult | null>(null)
  const [error, setError] = useState('')
  const [showFullPlaceholder, setShowFullPlaceholder] = useState(false)
  const [submittedBusiness, setSubmittedBusiness] = useState<SubmittedBusiness>({ businessName: '', websiteUrl: '' })

  useEffect(() => {
    if (!loading) return
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % dict.calculator.loading.length)
    }, 1100)
    return () => window.clearInterval(timer)
  }, [dict.calculator.loading.length, loading])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const updatePlaceholder = () => setShowFullPlaceholder(query.matches)
    updatePlaceholder()
    query.addEventListener('change', updatePlaceholder)
    return () => query.removeEventListener('change', updatePlaceholder)
  }, [])

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

    setSubmittedBusiness({ businessName: payload.businessName, websiteUrl: payload.websiteUrl })

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

  function getVerdict(score: number) {
    if (score <= 40) return dict.calculator.result.verdict.low
    if (score <= 70) return dict.calculator.result.verdict.mid
    return dict.calculator.result.verdict.high
  }

  function handleAuditClick() {
    const detail = {
      businessName: submittedBusiness.businessName,
      website: submittedBusiness.websiteUrl,
    }

    window.sessionStorage.setItem('tramuntana:audit-prefill', JSON.stringify(detail))
    window.dispatchEvent(new CustomEvent('tramuntana:audit-prefill', { detail }))
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
    <AnimatedSection id="calculator" className="bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <Reveal>
          <span className="eyebrow">{dict.calculator.eyebrow}</span>
          <h2 className="max-w-[420px] font-[var(--font-display)] [font-size:var(--text-h2)] font-semibold leading-[1.15] text-[var(--color-text-primary)]">
            {dict.calculator.headline}
          </h2>
          <p className="mt-3 max-w-[380px] font-[var(--font-body)] [font-size:var(--text-sm)] leading-[1.65] text-[var(--color-text-secondary)]">{dict.calculator.subheadline}</p>
        </Reveal>

        <div className="form-card p-6 md:p-8">
          {showResult ? (
            <div className="fade-in [animation-duration:300ms]">
              {error ? (
                <div>
                  <p className="font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">{error}</p>
                  <a href="#contact" className="btn btn-primary mt-6 inline-flex w-full">
                    {dict.calculator.cta}
                  </a>
                </div>
              ) : result ? (
                <div>
                  <CountUpScore
                    score={result.overallScore}
                    scoreClassName="font-[var(--font-mono)] text-[64px] font-medium leading-none text-[var(--color-gold)]"
                    suffixClassName="pb-2 font-[var(--font-mono)] [font-size:var(--text-sm)] text-[var(--color-text-tertiary)]"
                    progressClassName="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]"
                  />
                  <p className="mt-6 font-[var(--font-display)] [font-size:var(--text-h3)] font-semibold leading-[1.18] text-[var(--color-text-primary)]">
                    {getVerdict(result.overallScore)}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {metrics.map(([key, label, score]) => (
                      <li key={key} className="flex gap-3 font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.55] text-[var(--color-text-secondary)]">
                        <span className="mt-0.5 shrink-0 font-[var(--font-mono)] text-[var(--color-gold)]" aria-hidden="true">-&gt;</span>
                        <span>
                          {label}: <span className="text-[var(--color-text-primary)]">{score}/10</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 font-[var(--font-body)] [font-size:var(--text-sm)] leading-[1.65] text-[var(--color-text-tertiary)]">{result.narrative}</p>
                  <a href="#contact" onClick={handleAuditClick} className="btn btn-primary mt-8 inline-flex w-full">
                    {dict.calculator.result.auditCta}
                  </a>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mx-auto mt-5 block font-[var(--font-body)] [font-size:var(--text-sm)] text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-secondary)]"
                  >
                    {dict.calculator.result.reset}
                  </button>
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
                  placeholder={showFullPlaceholder ? dict.calculator.fields.websitePlaceholder : shortWebsitePlaceholder[lang]}
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
                    <option key={sector} style={{ background: 'var(--ink)', color: 'var(--color-text-primary)' }}>{sector}</option>
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
