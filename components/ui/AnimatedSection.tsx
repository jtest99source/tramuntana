'use client'

import { motion, useReducedMotion } from 'framer-motion'

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  )
}
