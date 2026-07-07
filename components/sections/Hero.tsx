'use client'

import { useEffect, useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import type { SectionProps } from '@/types'

export default function Hero({ dict }: SectionProps) {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!desktopQuery.matches || reduceMotionQuery.matches) {
      return
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setShowVideo(true))
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = globalThis.setTimeout(() => setShowVideo(true), 0)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  return (
    <section id="home" className="hero-grid relative flex min-h-screen items-center overflow-hidden bg-[var(--color-bg)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero/hero-poster.jpg')" }}
        aria-hidden="true"
      />
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero/hero-loop.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 bg-[#0C0C0C]/70" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0C0C0C] to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 md:py-32">
        <FadeIn y={20} onLoad>
          <span className="eyebrow mb-4 sm:mb-7">{dict.hero.eyebrow}</span>
          <span className="gold-rule mb-6 sm:mb-10" aria-hidden="true" />
        </FadeIn>
        <FadeIn delay={0.12} y={20} onLoad>
          <h1 className="max-w-[920px] font-[var(--font-display)] font-bold tracking-[var(--tracking-hero)] text-[var(--color-text-primary)]">
            <span className="block text-[clamp(38px,10vw,50px)] leading-[0.98] md:text-[clamp(62px,5.4vw,78px)]">
              {dict.hero.line1} {dict.hero.line2}
            </span>
            <span className="mt-4 block max-w-[760px] text-[clamp(27px,7vw,34px)] leading-[1.06] text-[var(--color-text-primary)] md:mt-6 md:text-[clamp(42px,3.55vw,54px)]">
              {dict.hero.line3} {dict.hero.line4}{' '}
              <em className="font-extrabold italic text-[var(--color-gold)]">{dict.hero.emphasis}</em>.
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.24} y={20} onLoad>
          <p className="mt-7 max-w-[560px] font-[var(--font-body)] [font-size:var(--text-body)] leading-[1.6] text-[var(--color-text-secondary)] sm:mt-9 sm:[font-size:var(--text-body-lg)] sm:leading-[1.7] md:mt-11 md:leading-[1.75]">{dict.hero.subheadline}</p>
        </FadeIn>
        <FadeIn delay={0.36} y={20} onLoad className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4 md:mt-12">
          <a href="#calculator" className="btn btn-primary w-full sm:w-auto">
            {dict.hero.primaryCta}
          </a>
          <a href="#contact" className="btn btn-secondary w-full sm:w-auto">
            {dict.hero.secondaryCta}
          </a>
        </FadeIn>
      </div>
      <a
        href="#problem"
        aria-label="Scroll"
        className="scroll-bounce absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-[var(--color-text-secondary)] md:block"
      >
        <span className="block h-4 w-4 rotate-45 border-b border-r border-current" />
      </a>
    </section>
  )
}
