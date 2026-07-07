type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}
