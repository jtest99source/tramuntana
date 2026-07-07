'use client'

import { useEffect, useRef, useState } from 'react'
import { useOnceInView } from '@/components/ui/Reveal'

type CountUpScoreProps = {
  score: number
  className?: string
  scoreClassName?: string
  suffixClassName?: string
  progressClassName?: string
}

export default function CountUpScore({
  score,
  className = '',
  scoreClassName = 'font-[var(--font-mono)] text-[60px] font-medium leading-none text-[var(--gold)]',
  suffixClassName = 'pb-2 font-[var(--font-mono)] [font-size:var(--text-sm)] text-[rgba(215,226,234,0.58)]',
  progressClassName = 'mt-5 h-1.5 overflow-hidden rounded-full bg-[rgba(215,226,234,0.14)]',
}: CountUpScoreProps) {
  const animationFrame = useRef<number | null>(null)
  const { ref, isInView, prefersReducedMotion } = useOnceInView<HTMLDivElement>()
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayScore(score)
      return
    }

    if (!isInView) return

    const duration = 1200
    const startedAt = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(score * eased))
      if (progress < 1) {
        animationFrame.current = window.requestAnimationFrame(tick)
      }
    }

    animationFrame.current = window.requestAnimationFrame(tick)

    return () => {
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current)
    }
  }, [isInView, prefersReducedMotion, score])

  const currentScore = prefersReducedMotion ? score : displayScore

  return (
    <div ref={ref} className={className}>
      <div className="flex items-end gap-3">
        <span className={scoreClassName}>{currentScore}</span>
        <span className={suffixClassName}>/100</span>
      </div>
      <div className={progressClassName}>
        <div className="h-full rounded-full bg-[var(--gold)]" style={{ width: `${currentScore}%` }} />
      </div>
    </div>
  )
}
