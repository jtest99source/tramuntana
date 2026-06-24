import type { Lang } from '@/lib/i18n/dictionaries'

export const langs: Lang[] = ['en', 'es', 'de']

export function isLang(value: string): value is Lang {
  return langs.includes(value as Lang)
}

export function clampScore(value: unknown, min: number, max: number) {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(number)) return min
  return Math.min(max, Math.max(min, Math.round(number)))
}
