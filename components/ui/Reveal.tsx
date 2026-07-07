'use client'

import { createElement, useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'span' | 'li' | 'article'
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(query.matches)

    updatePreference()
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

export function useOnceInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const element = ref.current
    if (!element || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsInView(true)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isInView, prefersReducedMotion])

  return { ref, isInView: isInView || prefersReducedMotion, prefersReducedMotion }
}

export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, isInView, prefersReducedMotion } = useOnceInView<HTMLElement>()

  const motionClass = prefersReducedMotion
    ? ''
    : 'transition-all duration-700 ease-out'
  const stateClass = isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
  const reducedMotionClass = 'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none'

  return createElement(
    as,
    {
      ref,
      className: `${motionClass} ${stateClass} ${reducedMotionClass} ${className}`.trim(),
      style: prefersReducedMotion ? undefined : { transitionDelay: `${delay}ms` },
    },
    children,
  )
}
