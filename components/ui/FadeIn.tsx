'use client'

import { motion, useReducedMotion } from 'framer-motion'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  as?: 'div' | 'span' | 'li' | 'article'
  onLoad?: boolean
}

export default function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  y = 20,
  as = 'div',
  onLoad = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]

  if (reduceMotion) {
    const StaticComponent = as
    return <StaticComponent className={className}>{children}</StaticComponent>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      animate={onLoad ? { opacity: 1, y: 0 } : undefined}
      whileInView={onLoad ? undefined : { opacity: 1, y: 0 }}
      viewport={onLoad ? undefined : { once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  )
}
