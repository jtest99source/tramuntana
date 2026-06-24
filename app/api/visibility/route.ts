import { NextRequest, NextResponse } from 'next/server'
import { clampScore, isLang } from '@/lib/utils'
import type { Lang } from '@/lib/i18n/dictionaries'

const windowMs = 60 * 60 * 1000
const maxRequests = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string) {
  const now = Date.now()
  const current = hits.get(ip)
  if (!current || current.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (current.count >= maxRequests) return false
  current.count += 1
  return true
}

function descriptorFor(score: number) {
  if (score < 25) return 'Critical'
  if (score < 45) return 'Low'
  if (score < 65) return 'Moderate'
  if (score < 80) return 'Good'
  return 'Strong'
}

const OTHER_SECTORS = new Set(['Other', 'Otro', 'Sonstiges'])

const SHOWCASE_OVERRIDES: Record<string, number> = {
  'balm restaurant': 96,
}

function showcaseNarrative(lang: Lang) {
  if (lang === 'es') return 'Balm Restaurant es uno de los locales mejor valorados de Mallorca — 5.0★ con más de 500 reseñas en Google. Su visibilidad digital refleja esa excelencia.'
  if (lang === 'de') return 'Balm Restaurant ist eines der bestbewerteten Lokale Mallorcas — 5,0★ mit über 500 Google-Bewertungen. Die digitale Sichtbarkeit spiegelt diese Exzellenz wider.'
  return 'Balm Restaurant is one of the best-rated venues in Mallorca — 5.0★ with over 500 Google reviews. Their digital visibility reflects that excellence.'
}


function fallbackNarrative(lang: Lang, sector: string, hasWebsite: boolean) {
  const isOtherSector = OTHER_SECTORS.has(sector)
  if (lang === 'es') {
    const phrase = isOtherSector ? 'tu negocio' : `negocios como el tuyo en el sector de ${sector}`
    return hasWebsite
      ? `La presencia digital existe, pero probablemente no está capturando toda la demanda de búsqueda y recomendaciones con IA para ${phrase}. La mayor oportunidad está en convertir esa presencia en visibilidad constante.`
      : `Sin una web visible, ${phrase} depende demasiado de referencias y plataformas externas. La mayor brecha está en construir una base digital propia que Google y la búsqueda con IA puedan encontrar.`
  }
  if (lang === 'de') {
    const phrase = isOtherSector ? 'Ihr Unternehmen' : `Unternehmen wie Ihres im Bereich ${sector}`
    return hasWebsite
      ? `Die digitale Präsenz ist vorhanden, erfasst aber wahrscheinlich nicht die volle Nachfrage für ${phrase}. Die größte Chance liegt darin, diese Präsenz in konstante Sichtbarkeit zu verwandeln.`
      : `Ohne sichtbare Website hängt ${phrase} zu stark von Empfehlungen und externen Plattformen ab. Die größte Lücke ist eine eigene digitale Basis, die Google und KI-Suche finden können.`
  }
  const phrase = isOtherSector ? 'your business' : `businesses like yours in ${sector}`
  return hasWebsite
    ? `The digital presence is there, but it is likely not capturing the full search and AI recommendation demand for ${phrase}. The biggest opportunity is turning that presence into consistent visibility.`
    : `Without a visible website, ${phrase} depends too heavily on referrals and third-party platforms. The biggest gap is building an owned digital base that Google and AI search can find.`
}

function fallbackResult(lang: Lang, sector: string, websiteUrl: string) {
  const hasWebsite = websiteUrl.trim().length > 0
  const googlePresence = hasWebsite ? 4 : 2
  const aiSearchVisibility = hasWebsite ? 2 : 1
  const onlineReputation = hasWebsite ? 5 : 3
  const overallScore = hasWebsite ? 38 : 22

  return {
    overallScore,
    descriptor: descriptorFor(overallScore),
    metrics: { googlePresence, aiSearchVisibility, onlineReputation },
    narrative: fallbackNarrative(lang, sector, hasWebsite),
  }
}

function getIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'local'
  )
}

export async function POST(request: NextRequest) {
  const ip = getIp(request)
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  if (!body?.businessName || !body?.sector) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const requestedLang = String(body.lang)
  const lang: Lang = isLang(requestedLang) ? requestedLang : 'en'
  const sector = String(body.sector)
  const websiteUrl = String(body.websiteUrl || '')

  const showcaseScore = SHOWCASE_OVERRIDES[String(body.businessName).toLowerCase().trim()]
  if (showcaseScore !== undefined) {
    return NextResponse.json({
      overallScore: showcaseScore,
      descriptor: descriptorFor(showcaseScore),
      metrics: { googlePresence: 9, aiSearchVisibility: 9, onlineReputation: 10 },
      narrative: showcaseNarrative(lang),
    })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(fallbackResult(lang, sector, websiteUrl))
  }

  const isOther = OTHER_SECTORS.has(sector)
  const system = `You are a digital visibility analyst. You receive basic information about a business and return a realistic estimated digital visibility assessment. You must respond ONLY with a valid JSON object - no markdown, no preamble, no explanation outside the JSON.

Scoring logic:
- If no website URL is provided, Google presence score is low (1-3/10)
- Small/local businesses in Mallorca without strong digital signals score 2-4/10 overall
- Established hotel or charter businesses might score 4-6/10 if they have a site
- Scores above 7/10 are rare and only for clearly well-established digital players
- Be realistic and slightly conservative - underselling is better than overselling

Narrative rules:
- 2 sentences max, in the language requested, highlighting the biggest gap
- Be specific to their sector when known
- IMPORTANT: if the sector is "Other", "Otro", or "Sonstiges", do NOT use that word in the narrative — refer to the business by name or use "this business" / "este negocio" / "dieses Unternehmen" instead${isOther ? '\n- The sector for this business is unspecified — write a generic but compelling narrative' : ''}

Return this exact JSON structure:
{
  "overallScore": <integer 1-100>,
  "descriptor": <string - one of: "Critical" | "Low" | "Moderate" | "Good" | "Strong">,
  "metrics": {
    "googlePresence": <integer 1-10>,
    "aiSearchVisibility": <integer 1-10>,
    "onlineReputation": <integer 1-10>
  },
  "narrative": <string>
}

Language for descriptor and narrative: ${lang}`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        temperature: 0.4,
        system,
        messages: [
          {
            role: 'user',
            content: JSON.stringify({
              businessName: String(body.businessName),
              websiteUrl,
              sector,
              lang,
            }),
          },
        ],
      }),
    })

    if (!response.ok) throw new Error(`Anthropic error ${response.status}`)
    const data = await response.json()
    const raw: string = data?.content?.[0]?.text ?? ''
    const text = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '').trim()
    const parsed = JSON.parse(text)

    const overallScore = clampScore(parsed.overallScore, 1, 100)
    return NextResponse.json({
      overallScore,
      descriptor: ['Critical', 'Low', 'Moderate', 'Good', 'Strong'].includes(parsed.descriptor)
        ? parsed.descriptor
        : descriptorFor(overallScore),
      metrics: {
        googlePresence: clampScore(parsed.metrics?.googlePresence, 1, 10),
        aiSearchVisibility: clampScore(parsed.metrics?.aiSearchVisibility, 1, 10),
        onlineReputation: clampScore(parsed.metrics?.onlineReputation, 1, 10),
      },
      narrative: String(parsed.narrative || fallbackNarrative(lang, sector, Boolean(websiteUrl))),
    })
  } catch {
    return NextResponse.json(fallbackResult(lang, sector, websiteUrl))
  }
}
