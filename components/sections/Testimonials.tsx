'use client'

import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import FadeIn from '@/components/ui/FadeIn'
import type { SectionProps } from '@/types'

export default function Testimonials({ dict }: SectionProps) {
  const [featured, ...supporting] = dict.testimonials
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  function updateActiveIndex() {
    const track = trackRef.current
    if (!track) return

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth)
    setActiveIndex(Math.max(0, Math.min(dict.testimonials.length - 1, nextIndex)))
  }

  function scrollToTestimonial(index: number) {
    const track = trackRef.current
    if (!track) return

    track.scrollTo({
      left: index * track.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    setActiveIndex(index)
  }

  return (
    <AnimatedSection id="testimonials" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-[var(--space-xl)]">
      <div className="mx-auto max-w-6xl px-6 md:hidden">
        <div
          ref={trackRef}
          onScroll={updateActiveIndex}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Testimonials"
        >
          {dict.testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="mr-5 flex h-[440px] min-w-full snap-center flex-col justify-between border border-[var(--color-border)] bg-[rgba(14,34,51,0.24)] p-6 last:mr-0"
            >
              <blockquote>
                <span className="mb-4 block select-none font-[var(--font-display)] text-[3rem] leading-none text-[var(--color-gold)]" aria-hidden="true">&ldquo;</span>
                <p className="font-[var(--font-display)] text-[21px] font-normal italic leading-[1.36] text-[var(--color-text-primary)]">{testimonial.quote}</p>
              </blockquote>
              <p className="mt-7 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-tertiary)]">
                <span className="text-[var(--color-gold)]">{testimonial.name}</span> / {testimonial.role}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3" aria-label="Testimonial controls">
          {dict.testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => scrollToTestimonial(index)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-[var(--color-gold)]' : 'bg-[rgba(215,226,234,0.28)]'
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl gap-8 px-6 md:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <FadeIn as="article" className="border-l border-[var(--color-gold)] pl-10">
          <blockquote>
            <span className="mb-5 block select-none font-[var(--font-display)] text-[5rem] leading-none text-[var(--color-gold)]" aria-hidden="true">&ldquo;</span>
            <p className="font-[var(--font-display)] text-[clamp(26px,3.4vw,46px)] font-normal italic leading-[1.22] text-[var(--color-text-primary)]">{featured.quote}</p>
          </blockquote>
          <p className="mt-8 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-tertiary)]">
            <span className="text-[var(--color-gold)]">{featured.name}</span> / {featured.role}
          </p>
        </FadeIn>

        <div className="grid gap-6">
          {supporting.map((testimonial, index) => (
            <FadeIn
              as="article"
              key={testimonial.name}
              delay={0.12 + index * 0.08}
              className="border border-[var(--color-border)] bg-[rgba(14,34,51,0.42)] p-7"
            >
              <blockquote>
                <span className="mb-3 block select-none font-[var(--font-display)] text-[2.5rem] leading-none text-[var(--color-gold)]" aria-hidden="true">&ldquo;</span>
                <p className="font-[var(--font-display)] text-[clamp(18px,2vw,23px)] font-normal italic leading-[1.45] text-[var(--color-text-primary)]">{testimonial.quote}</p>
              </blockquote>
              <p className="mt-6 font-[var(--font-mono)] [font-size:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--color-text-tertiary)]">
                <span className="text-[var(--color-gold)]">{testimonial.name}</span> / {testimonial.role}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
