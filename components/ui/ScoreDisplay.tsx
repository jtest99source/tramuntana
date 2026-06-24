type ScoreDisplayProps = {
  score: number
  descriptor: string
}

export default function ScoreDisplay({ score, descriptor }: ScoreDisplayProps) {
  return (
    <div>
      <div className="flex items-end gap-3">
        <span className="font-[var(--font-mono)] text-[64px] font-medium leading-none text-[var(--color-gold)]">
          {score}
        </span>
        <span className="pb-2 font-[var(--font-mono)] [font-size:var(--text-sm)] text-[var(--color-text-tertiary)]">/ 100</span>
      </div>
      <p className="mt-3 font-[var(--font-mono)] [font-size:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-caps)] text-[var(--color-gold-muted)]">{descriptor}</p>
    </div>
  )
}
