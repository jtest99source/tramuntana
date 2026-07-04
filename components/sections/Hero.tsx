import FadeIn from '@/components/ui/FadeIn'
import type { SectionProps } from '@/types'

export default function Hero({ dict }: SectionProps) {
  return (
    <section id="home" className="hero-grid relative flex min-h-screen items-center overflow-hidden bg-[var(--color-bg)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 md:py-40">
        <FadeIn y={20} onLoad>
          <span className="eyebrow mb-4 sm:mb-7">{dict.hero.eyebrow}</span>
          <span className="gold-rule mb-6 sm:mb-10" aria-hidden="true" />
        </FadeIn>
        <FadeIn delay={0.12} y={20} onLoad>
          <h1 className="max-w-[880px] font-[var(--font-display)] text-[clamp(38px,11vw,50px)] font-bold leading-[0.98] tracking-[var(--tracking-hero)] text-[var(--color-text-primary)] md:[font-size:var(--text-hero)] md:leading-[var(--leading-hero)]">
            {dict.hero.line1}
            <br />
            {dict.hero.line2}
            <br />
            {dict.hero.line3}
            <br />
            {dict.hero.line4}{' '}
            <em className="font-extrabold italic text-[var(--color-gold)]">{dict.hero.emphasis}</em>.
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
        className="scroll-bounce absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[var(--color-text-secondary)] md:block"
      >
        <span className="block h-4 w-4 rotate-45 border-b border-r border-current" />
      </a>
    </section>
  )
}
