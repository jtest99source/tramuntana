'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Reveal from '@/components/ui/Reveal'
import type { SectionProps } from '@/types'

type AuditPrefill = {
  businessName: string
  website: string
}

export default function ContactCTA({ dict, lang }: SectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [prefill, setPrefill] = useState<AuditPrefill>({ businessName: '', website: '' })

  useEffect(() => {
    function applyPrefill(nextPrefill: Partial<AuditPrefill>) {
      setPrefill((current) => ({
        businessName: nextPrefill.businessName ?? current.businessName,
        website: nextPrefill.website ?? current.website,
      }))
    }

    const storedPrefill = window.sessionStorage.getItem('tramuntana:audit-prefill')
    if (storedPrefill) {
      try {
        applyPrefill(JSON.parse(storedPrefill) as Partial<AuditPrefill>)
      } catch {
        window.sessionStorage.removeItem('tramuntana:audit-prefill')
      }
    }

    function handlePrefill(event: Event) {
      applyPrefill((event as CustomEvent<Partial<AuditPrefill>>).detail || {})
    }

    window.addEventListener('tramuntana:audit-prefill', handlePrefill)
    return () => window.removeEventListener('tramuntana:audit-prefill', handlePrefill)
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          businessName: formData.get('businessName'),
          email: formData.get('email'),
          website: formData.get('website'),
          message: formData.get('message'),
          lang,
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
      setPrefill({ businessName: '', website: '' })
      window.sessionStorage.removeItem('tramuntana:audit-prefill')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatedSection id="contact" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto max-w-[560px] px-6 text-center">
        <Reveal>
          <span className="eyebrow text-center">{dict.nav.freeAudit}</span>
          <h2 className="font-[var(--font-display)] [font-size:var(--text-h2)] font-bold leading-[1.1] tracking-[var(--tracking-hero)] text-[var(--color-text-primary)]">
            {dict.contact.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-[440px] font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.65] text-[var(--color-text-secondary)]">{dict.contact.subheadline}</p>
        </Reveal>

        <div className="form-card mt-12 p-6 text-left md:p-8" aria-live="polite">
          {status === 'success' ? (
            <div className="fade-in py-6" role="status">
              <p className="font-[var(--font-mono)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-caps)] text-[var(--color-gold)]">✓ {dict.contact.successLabel}</p>
              <p className="mt-6 font-[var(--font-display)] [font-size:var(--text-h3)] leading-[1.25] text-[var(--color-text-primary)]">{dict.contact.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">
                    {dict.contact.fields.name}
                  </label>
                  <input id="name" name="name" required className="input-field" />
                </div>
                <div>
                  <label className="label" htmlFor="contactBusinessName">
                    {dict.contact.fields.businessName}
                  </label>
                  <input
                    id="contactBusinessName"
                    name="businessName"
                    required
                    className="input-field"
                    value={prefill.businessName}
                    onChange={(event) => setPrefill((current) => ({ ...current, businessName: event.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label" htmlFor="email">
                    {dict.contact.fields.email}
                  </label>
                  <input id="email" name="email" type="email" required className="input-field" />
                </div>
                <div>
                  <label className="label" htmlFor="website">
                    {dict.contact.fields.website}
                  </label>
                  <input
                    id="website"
                    name="website"
                    className="input-field"
                    value={prefill.website}
                    onChange={(event) => setPrefill((current) => ({ ...current, website: event.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="message">
                  {dict.contact.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="input-field resize-y"
                  placeholder={dict.contact.fields.messagePlaceholder}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={status === 'loading'}>
                {dict.contact.submit}
              </button>
              {status === 'error' ? <p role="alert" className="[font-size:var(--text-sm)] text-[var(--color-danger)]">{dict.contact.error}</p> : null}
            </form>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}
