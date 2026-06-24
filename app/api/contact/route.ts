import { NextRequest, NextResponse } from 'next/server'

const windowMs = 60 * 60 * 1000
const maxRequests = 10
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
  if (!body?.name || !body?.businessName || !body?.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const contactEmail = process.env.CONTACT_EMAIL || 'hello@tramuntanadigital.com'
  const subject = `Free audit request - ${body.businessName}`
  const text = [
    `Name: ${body.name}`,
    `Business: ${body.businessName}`,
    `Email: ${body.email}`,
    `Website: ${body.website || '-'}`,
    `Language: ${body.lang || '-'}`,
    '',
    `Message: ${body.message || '-'}`,
  ].join('\n')

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Tramuntana Digital <onboarding@resend.dev>',
        to: [contactEmail],
        subject,
        text,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 })
    }
  } else {
    console.info('Contact form submission', text)
  }

  return NextResponse.json({ ok: true })
}
