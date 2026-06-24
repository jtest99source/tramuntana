import type { Dictionary, Lang } from '@/lib/i18n/dictionaries'

export type SectionProps = {
  dict: Dictionary
  lang: Lang
}

export type VisibilityPayload = {
  businessName: string
  websiteUrl?: string
  sector: string
  lang: Lang
}

export type VisibilityResult = {
  overallScore: number
  descriptor: string
  metrics: {
    googlePresence: number
    aiSearchVisibility: number
    onlineReputation: number
  }
  narrative: string
}
