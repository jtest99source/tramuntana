import type { ReactNode } from 'react'

export function em(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <span key={i} className="text-[var(--color-text-primary)]">{part.slice(2, -2)}</span>
      : part
  )
}
