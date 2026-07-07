type LogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

const letters = ['D', 'I', 'G', 'I', 'T', 'A', 'L']

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const wordColor = variant === 'light' ? 'text-[var(--navy)]' : 'text-[#F5F1E8]'
  const digitalColor = variant === 'light' ? 'text-[#B88417]' : 'text-[var(--color-gold)]'

  return (
    <span className={`group inline-flex flex-col leading-none ${className}`.trim()} aria-label="Tramuntana Digital">
      <span
        className={`text-[21px] font-semibold leading-[0.9] tracking-[0.01em] md:text-[25px] ${wordColor}`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Tramuntana
      </span>
      <span
        className={`mt-[3px] inline-flex w-full justify-between font-[var(--font-mono)] text-[7px] font-medium uppercase leading-none tracking-[0] transition-colors duration-200 group-hover:text-[var(--color-gold-light)] md:text-[8px] ${digitalColor}`}
        aria-hidden="true"
      >
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>
    </span>
  )
}
