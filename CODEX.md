# CODEX.md — Tramuntana Digital Landing Page

## Project overview

Single-page marketing landing for **Tramuntana Digital** (`tramuntanadigital.com`), a boutique digital marketing agency based in Mallorca specialising in SEO, GEO/AI search optimisation, web, social media, and intelligent automation. The founder operates solo and sells primarily through in-person pitches — this landing page functions as a credibility asset and lead capture tool, not a self-serve sales page. No pricing is shown. The goal is: visitor arrives → understands the opportunity → runs the visibility calculator → requests a free audit.

Target clients: owners and managers of boutique hotels, boat charter companies, and luxury real estate agencies in Mallorca — predominantly international (British, German, Scandinavian), 35–60 years old, sophisticated but not necessarily tech-savvy, likely already burned by agencies that overpromised.

The page is trilingual: **English (default)**, **Spanish**, **German**. Language is switchable via a nav toggle. All copy exists in all three languages. URL structure: `/?lang=en`, `/?lang=es`, `/?lang=de` or i18n routing via Next.js `app/[lang]`.

---

## Tech stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Via `next/font` — Playfair Display (display/headings) + Inter (body/UI)
- **Animations:** Framer Motion — scroll-triggered reveals only, no gratuitous effects
- **AI calculator:** Anthropic Claude API (`claude-sonnet-4-6`) called from a Next.js API route
- **Forms:** Native with server action or API route — no third-party form library
- **Deployment:** Vercel
- **i18n:** Custom dictionary pattern with `app/[lang]/page.tsx` — no external i18n library

---

## Design system

### Visual direction

Inspired by editorial European agency aesthetics (reference: Flair Digital). Dark, authoritative, typographically-led. The signature element is the **full-bleed dark hero with oversized Playfair Display headline** — the typography IS the design. Everything else is quiet and disciplined around it.

**Do not** default to:
- Gradient mesh backgrounds
- Rounded card grids with icons and bullets
- Teal/coral/cream "warm agency" palettes
- Animated counters or particle effects

### Colour palette

```
--color-bg:          #0A0A0A   /* near-black base */
--color-bg-section:  #111111   /* slightly lighter for alternating sections */
--color-bg-card:     #161616   /* card surfaces */
--color-border:      #222222   /* hairline dividers */
--color-accent:      #C8A96E   /* warm gold — used sparingly, only for key highlights */
--color-text-primary:#F5F5F0   /* warm white, not pure white */
--color-text-muted:  #888884   /* secondary text */
--color-text-accent: #C8A96E   /* accent text */
```

The accent gold `#C8A96E` is used for:
- The word or phrase in each headline that carries the most weight
- CTA button backgrounds
- Score number in the calculator
- Horizontal rule accents

It is NOT used for:
- Icon fills
- Background sections
- Decorative borders

### Typography

```
Display:  Playfair Display — weights 400 (regular) and 700 (bold)
          Used for: H1, H2, blockquotes, the "With Tramuntana." closing line
          Italic variant used for emphasis words within headlines

Body:     Inter — weights 400 and 500
          Used for: body copy, nav, labels, buttons, captions, calculator UI

Utility:  Inter Mono — weight 400
          Used only for: score numbers, metric readouts in calculator
```

### Type scale

```
Hero headline:     clamp(3rem, 8vw, 7rem)   Playfair Display 700
Section headline:  clamp(2rem, 4vw, 3.5rem) Playfair Display 400
Subheadline:       1.25rem                  Inter 400, muted colour
Body:              1rem / line-height 1.75  Inter 400
Caption/label:     0.8125rem               Inter 500, uppercase, letter-spacing 0.1em
Button:            0.9375rem               Inter 500
Score display:     clamp(3rem, 6vw, 5rem)  Inter Mono 400, accent colour
```

### Spacing

Use a consistent 8px base grid. Section vertical padding: `py-24 md:py-32`. Max content width: `max-w-6xl mx-auto px-6`.

### Borders and dividers

Hairline `1px solid #222222` horizontal rules between sections. No rounded corners on section dividers. Cards use `border border-[#222222]` with `rounded-none` — zero border radius everywhere except CTA buttons (`rounded-sm`, 4px max).

### Motion

- All section content fades up on scroll entry (`opacity: 0 → 1`, `y: 24px → 0`, `duration: 0.6s`, `ease: easeOut`)
- Stagger children by 0.1s within sections
- Calculator result animates in with the same fade-up
- No looping animations, no hover scale transforms on text, no parallax
- Respect `prefers-reduced-motion` — wrap all Framer Motion in a check

---

## File structure

```
app/
  [lang]/
    page.tsx              ← main landing page, imports all sections
    layout.tsx            ← font loading, metadata, lang param
  api/
    visibility/
      route.ts            ← Claude API call for calculator
  globals.css             ← Tailwind base + CSS custom properties
components/
  nav/
    Navbar.tsx            ← logo + lang switcher + CTA button
  sections/
    Hero.tsx
    Problem.tsx
    Services.tsx
    Calculator.tsx
    WhyTramuntana.tsx
    Testimonials.tsx
    MallorcaVerified.tsx
    ContactCTA.tsx
  footer/
    Footer.tsx
  ui/
    LanguageSwitcher.tsx
    ScoreDisplay.tsx
    AnimatedSection.tsx   ← reusable scroll-reveal wrapper
lib/
  i18n/
    dictionaries.ts       ← type definitions
    en.ts
    es.ts
    de.ts
  utils.ts
types/
  index.ts
```

---

## i18n architecture

No external library. Dictionary pattern:

```typescript
// lib/i18n/dictionaries.ts
export type Lang = 'en' | 'es' | 'de'

export async function getDictionary(lang: Lang) {
  const dicts = {
    en: () => import('./en').then(m => m.default),
    es: () => import('./es').then(m => m.default),
    de: () => import('./de').then(m => m.default),
  }
  return dicts[lang]()
}
```

All components receive `dict` as a prop. No client-side language switching that causes layout shift — language change navigates to `/?lang=xx`.

The `LanguageSwitcher` component renders three buttons: `EN`, `ES`, `DE`. Active language is visually distinguished with accent colour underline.

---

## Section-by-section specification

---

### 1. Navbar

**Layout:** Fixed top. Full width. `backdrop-blur-sm bg-[#0A0A0A]/80`. Height 64px. Horizontal padding matches content max-width.

**Left:** Wordmark "Tramuntana" in Playfair Display, `#F5F5F0`, ~1.25rem. No icon/logo mark needed — the name IS the mark.

**Centre:** Empty.

**Right:** Language switcher (`EN · ES · DE`) + CTA button ("Free audit" / "Auditoría gratuita" / "Kostenlose Prüfung") in accent gold background, Inter 500, small, `rounded-sm`.

**Behaviour:** On scroll past hero, nav border-bottom `1px solid #222222` appears. No hamburger menu needed — mobile nav collapses to logo + CTA button only, language switcher moves to footer.

---

### 2. Hero section

**Full viewport height.** `min-h-screen`. Background `#0A0A0A`. Vertically centred content.

**Layout:**
```
[eyebrow label]
[H1 headline — 2-3 lines]
[subheadline — 1-2 lines]
[two CTAs side by side]
[scroll indicator arrow at bottom]
```

**Eyebrow:** Small caps label, Inter 500, muted, letter-spaced. Content:
- EN: `Digital marketing · Mallorca`
- ES: `Marketing digital · Mallorca`
- DE: `Digitales Marketing · Mallorca`

**H1 headline (EN):**
```
Your competitors are
winning clients online.
Not because they're better —
because they're *visible*.
```
The word `visible` renders in Playfair Display italic, accent gold colour `#C8A96E`.

**H1 headline (ES):**
```
Tu competencia está ganando
clientes online.
No porque sean mejores —
sino porque son *visibles*.
```

**H1 headline (DE):**
```
Ihre Mitbewerber gewinnen
Kunden online.
Nicht weil sie besser sind —
sondern weil sie *sichtbar* sind.
```

**Subheadline (EN):** `Most businesses in Mallorca run on reputation and word of mouth. That's not enough anymore. The window to get ahead is open — but not for long.`

**Subheadline (ES):** `La mayoría de negocios en Mallorca funcionan por reputación y boca a boca. Ya no es suficiente. La ventana para adelantarse está abierta — pero no por mucho tiempo.`

**Subheadline (DE):** `Die meisten Unternehmen auf Mallorca laufen über Reputation und Mundpropaganda. Das reicht nicht mehr. Das Zeitfenster, um die Nase vorn zu haben, ist offen — aber nicht mehr lange.`

**CTAs:**
- Primary: "Check your visibility" / "Comprueba tu visibilidad" / "Sichtbarkeit prüfen" → scrolls to calculator section. Accent gold button.
- Secondary: "Free audit" / "Auditoría gratuita" / "Kostenlose Prüfung" → scrolls to contact. Ghost button (border only).

**Scroll indicator:** Small downward chevron, muted colour, subtle bounce animation (CSS only, 2s loop). Disappears after user scrolls past hero.

**Background detail:** Extremely subtle grid of hairlines (`#1A1A1A`) — like graph paper. Not a gradient, not a texture. Just structure. Implemented as SVG background pattern via CSS.

---

### 3. Problem section

**Background:** `#0A0A0A`. Horizontal rule top `1px solid #222222`.

**Layout:** Two columns on desktop. Left: large stat or pull quote. Right: body copy.

**Left (large statement):**
```
EN: "A better-optimised competitor
    doesn't need to be better.
    Just easier to find."

ES: "Un competidor mejor optimizado
    no necesita ser mejor.
    Solo más fácil de encontrar."

DE: "Ein besser optimierter Mitbewerber
    muss nicht besser sein.
    Nur leichter zu finden."
```
Playfair Display, large, `#F5F5F0`. One key phrase per language in italic accent gold.

**Right (body copy EN):**
```
Mallorca's best businesses have built their reputation over decades.
But reputation doesn't show up in Google. It doesn't appear in ChatGPT
when a tourist asks for the best charter in the bay. It doesn't rank on
TripAdvisor, Instagram, or AI search engines that millions of travellers
use before they book.

The businesses winning new clients today aren't necessarily the best ones.
They're the ones that understood digital visibility early.

That gap still exists in Mallorca. For now.
```

Body copy ES and DE: translate with equivalent natural tone — not literal translation.

**No icons, no bullet points, no cards.** Just type on dark background. This section is intentionally austere — the words do all the work.

---

### 4. Services section

**Background:** `#111111`. Horizontal rule top.

**Section label (eyebrow):** "What we do" / "Qué hacemos" / "Was wir tun"

**Section headline:**
- EN: `Everything your business needs to be found — and chosen.`
- ES: `Todo lo que tu negocio necesita para ser encontrado — y elegido.`
- DE: `Alles, was Ihr Unternehmen braucht, um gefunden — und gewählt — zu werden.`

**Layout:** 5 service blocks in a horizontal rule-divided list. Each block: service name left, one-line description right. Desktop: full width table-like layout. Mobile: stacked.

```
SEO                → Rank on Google when your clients are searching.
GEO / AI Search    → Appear in ChatGPT, Perplexity, and AI travel recommendations.
Web & Digital Presence → A site that converts visitors into enquiries.
Social Media       → Content that builds authority in your market.
Intelligent Automation → Respond to reviews, follow up with leads, run 24/7.
```

ES translations:
```
SEO                → Posiciona en Google cuando tus clientes buscan.
GEO / IA Search    → Aparece en ChatGPT, Perplexity y recomendaciones de IA.
Web y Presencia Digital → Una web que convierte visitas en consultas.
Redes Sociales     → Contenido que construye autoridad en tu mercado.
Automatización Inteligente → Responde reseñas, hace seguimiento, funciona 24/7.
```

DE translations:
```
SEO                → Bei Google ranken, wenn Ihre Kunden suchen.
GEO / KI-Suche     → In ChatGPT, Perplexity und KI-Reiseempfehlungen erscheinen.
Web & digitale Präsenz → Eine Website, die Besucher in Anfragen umwandelt.
Social Media       → Inhalte, die Autorität in Ihrem Markt aufbauen.
Intelligente Automatisierung → Bewertungen beantworten, Leads nachverfolgen, 24/7.
```

No pricing. No "learn more" links. No icons. Clean horizontal rules between each service row.

Below the list, a single sentence in muted text:
- EN: `Every engagement is tailored. No packages, no templates — just what your business actually needs.`
- ES: `Cada proyecto es a medida. Sin paquetes ni plantillas — solo lo que tu negocio realmente necesita.`
- DE: `Jedes Projekt ist maßgeschneidert. Keine Pakete, keine Vorlagen — nur das, was Ihr Unternehmen wirklich braucht.`

---

### 5. Visibility Calculator section

**Background:** `#0A0A0A`. This is the most interactive section — treat it as the centrepiece of the page.

**Section label:** "Visibility Check" / "Comprueba tu visibilidad" / "Sichtbarkeits-Check"

**Section headline:**
- EN: `How visible is your business right now?`
- ES: `¿Qué tan visible es tu negocio ahora mismo?`
- DE: `Wie sichtbar ist Ihr Unternehmen gerade?`

**Subheadline:**
- EN: `Enter your business details and get an instant digital visibility score. Free, instant, no strings.`
- ES: `Introduce los datos de tu negocio y obtén un score de visibilidad digital al instante. Gratis, inmediato, sin compromiso.`
- DE: `Geben Sie Ihre Unternehmensdaten ein und erhalten Sie sofort einen digitalen Sichtbarkeitsscore. Kostenlos, sofort, unverbindlich.`

**Calculator UI:**

Form fields (all required):
1. Business name — text input
2. Website URL — text input (optional, placeholder "yourwebsite.com — leave blank if none")
3. Sector — select dropdown:
   - Boutique hotel / Hotel boutique / Boutique-Hotel
   - Boat charter / Charter náutico / Bootscharterr
   - Luxury real estate / Inmobiliaria de lujo / Luxusimmobilien
   - Restaurant / Restaurante / Restaurant
   - Other / Otro / Sonstiges

Submit button: "Analyse now" / "Analizar ahora" / "Jetzt analysieren" — full width, accent gold.

**Loading state:** Simple text cycling through 3 messages with a fade:
- EN: "Checking Google presence..." → "Scanning AI search engines..." → "Calculating your score..."
- ES: "Comprobando presencia en Google..." → "Analizando motores de búsqueda IA..." → "Calculando tu score..."
- DE: "Google-Präsenz wird geprüft..." → "KI-Suchmaschinen werden gescannt..." → "Score wird berechnet..."

**Result display:**

After API response, render:
```
[Large score number — e.g. "34" in Inter Mono, accent gold, large]
[Label: "/ 100" muted]
[Descriptor: e.g. "Low visibility" / "Visibilidad baja" / "Geringe Sichtbarkeit"]

[Three metric rows:]
  Google presence        [score/10]  [bar]
  AI search visibility   [score/10]  [bar]
  Online reputation      [score/10]  [bar]

[Two-line narrative paragraph — personalised by AI]

[CTA button: "Request your free audit" / "Solicitar auditoría gratuita" / "Kostenlose Prüfung anfordern"]
```

Score bars: thin `2px` horizontal bars, `#222222` background, accent gold fill animating left-to-right on appear (CSS transition, 0.8s ease-out, staggered).

**Important:** The scores are AI-generated estimates based on sector + whether a URL was provided. They are intentionally approximate — the point is to surface the problem, not to be a precise audit tool. The calculator must include a small disclaimer in muted text below results:
- EN: `This is an estimated score based on your sector and digital footprint. A full audit provides precise, actionable data.`
- ES: `Este es un score estimado basado en tu sector y huella digital. Una auditoría completa proporciona datos precisos y accionables.`
- DE: `Dies ist ein geschätzter Score basierend auf Ihrer Branche und digitalem Fußabdruck. Ein vollständiges Audit liefert präzise, umsetzbare Daten.`

---

### 6. API route — `/api/visibility/route.ts`

POST endpoint. Receives: `{ businessName, websiteUrl, sector, lang }`.

System prompt to Claude:
```
You are a digital visibility analyst. You receive basic information about a business 
and return a realistic estimated digital visibility assessment. You must respond ONLY 
with a valid JSON object — no markdown, no preamble, no explanation outside the JSON.

Scoring logic:
- If no website URL is provided, Google presence score is low (1-3/10)
- Small/local businesses in Mallorca without strong digital signals score 2-4/10 overall
- Established hotel or charter businesses might score 4-6/10 if they have a site
- Scores above 7/10 are rare and only for clearly well-established digital players
- Be realistic and slightly conservative — underselling is better than overselling

Return this exact JSON structure:
{
  "overallScore": <integer 1-100>,
  "descriptor": <string — one of: "Critical" | "Low" | "Moderate" | "Good" | "Strong">,
  "metrics": {
    "googlePresence": <integer 1-10>,
    "aiSearchVisibility": <integer 1-10>,
    "onlineReputation": <integer 1-10>
  },
  "narrative": <string — 2 sentences max, specific to their sector, in the language requested, highlighting the biggest gap>
}

Language for descriptor and narrative: {{lang}}
```

Replace `{{lang}}` with the lang param. Narrative must be in the requested language.

Parse JSON from response. If parsing fails, return a graceful error state with a fallback message and a direct CTA to contact.

**Security:** Rate limit this endpoint — max 5 requests per IP per hour. Use Vercel's edge rate limiting or a simple in-memory store. The endpoint must NOT expose the Claude API key client-side.

---

### 7. Why Tramuntana section

**Background:** `#111111`.

**Layout:** Left column text, right column a simple vertical list of differentiators.

**Section headline:**
- EN: `We know Mallorca from the inside.`
- ES: `Conocemos Mallorca desde dentro.`
- DE: `Wir kennen Mallorca von innen.`

**Body copy (EN):**
```
Most digital agencies selling to Mallorca businesses are based in Madrid, 
Barcelona, or London. They know marketing. They don't know that your peak 
season is compressed into 14 weeks. They don't know the difference between 
a client who found you on Google and one who walked in from the port.

We're local. We understand the market, the seasonality, the client mix — 
international visitors, expat residents, high-net-worth travellers. And we 
combine that with the same digital strategies used by leading brands globally.
```

**Body copy (ES):**
```
La mayoría de agencias digitales que venden a negocios en Mallorca están en 
Madrid, Barcelona o Londres. Saben de marketing. No saben que tu temporada alta 
se comprime en 14 semanas. No saben la diferencia entre un cliente que te 
encontró en Google y uno que entró desde el puerto.

Somos locales. Entendemos el mercado, la estacionalidad, la mezcla de clientes 
— visitantes internacionales, residentes expats, viajeros de alto poder adquisitivo. 
Y combinamos eso con las mismas estrategias digitales que usan las marcas líderes a nivel global.
```

**Body copy (DE):**
```
Die meisten Digitalagenturen, die Mallorca-Unternehmen ansprechen, sitzen in 
Madrid, Barcelona oder London. Sie verstehen Marketing. Aber nicht, dass Ihre 
Hochsaison auf 14 Wochen verdichtet ist. Nicht den Unterschied zwischen einem 
Kunden, der Sie über Google gefunden hat, und einem, der vom Hafen hereinkam.

Wir sind lokal. Wir verstehen den Markt, die Saisonalität, den Kundenmix — 
internationale Besucher, Expat-Bewohner, vermögende Reisende. Und wir kombinieren 
das mit denselben digitalen Strategien, die führende Marken weltweit einsetzen.
```

**Right column — differentiators list (EN):**
```
Based in Mallorca
Works exclusively with international-facing businesses
SEO + GEO/AI search specialists
No lock-in contracts
Direct access to the person doing the work
Partner network: Mallorca Verified
```

Rendered as a vertical list with thin gold left-border accent on each item. Inter 500, `#F5F5F0`.

---

### 8. Testimonials section

**Background:** `#0A0A0A`.

**Layout:** Three testimonial cards in a row (desktop), stacked (mobile). Cards: `bg-[#161616]` border `1px solid #222222`, `rounded-none`, padding `p-8`.

**Each card contains:**
- Quote text — Playfair Display italic, `#F5F5F0`
- Name — Inter 500, muted
- Role + business type — Inter 400, muted, smaller

**Testimonials — all in English (same on all lang versions, as international clients):**

Card 1:
```
"We had a fully booked summer season before Tramuntana, but we were losing 
winter enquiries to competitors we knew were worse than us. Within three months, 
that changed completely."
— James R., Owner, Boutique Hotel, Northwest Mallorca
```

Card 2:
```
"I had no idea ChatGPT and Google were sending clients to our competitors 
when they searched for charter in the bay. Getting that fixed was the best 
decision I made this year."
— Henrik S., Director, Yacht Charter Company, Palma
```

Card 3:
```
"Our listings were sitting there doing nothing. Now we get qualified buyer 
enquiries from people who found us through search — not through a referral 
network we had to maintain."
— Claire M., Partner, Luxury Real Estate, Mallorca
```

Note to Codex: these testimonials are illustrative. Do not add any disclaimer — render them as genuine client quotes.

---

### 9. Mallorca Verified partnership section

**Background:** `#111111`. This section has a slightly different visual treatment — include a thin gold horizontal rule as top border instead of the standard dark border.

**Section label:** "Partner ecosystem" / "Ecosistema de socios" / "Partner-Ökosystem"

**Section headline:**
- EN: `Your business, amplified by Mallorca Verified.`
- ES: `Tu negocio, amplificado por Mallorca Verified.`
- DE: `Ihr Unternehmen, verstärkt durch Mallorca Verified.`

**Layout:** Two columns. Left: copy. Right: stylised representation of what MV is (text-based — no image needed).

**Body copy (EN):**
```
Mallorca Verified is an independent, data-driven platform ranking the island's 
best hotels, restaurants, beach clubs, boat rentals, and activities — built on 
real Google review data and an objective scoring algorithm.

Every business we work with gets an enriched, verified listing on Mallorca Verified. 
That means an additional online presence, backlink authority, and visibility in a 
platform specifically designed to be cited by AI search engines like ChatGPT and 
Perplexity when travellers and relocators ask about Mallorca.

No other agency on the island can offer this.
```

**Body copy (ES):**
```
Mallorca Verified es una plataforma independiente y basada en datos que clasifica 
los mejores hoteles, restaurantes, beach clubs, alquileres de barcos y actividades 
de la isla — construida sobre datos reales de reseñas de Google y un algoritmo 
de puntuación objetivo.

Cada negocio con el que trabajamos obtiene una ficha enriquecida y verificada en 
Mallorca Verified. Eso significa una presencia online adicional, autoridad de 
backlinks y visibilidad en una plataforma diseñada específicamente para ser citada 
por motores de búsqueda de IA como ChatGPT y Perplexity cuando viajeros y personas 
que se reubican preguntan sobre Mallorca.

Ninguna otra agencia de la isla puede ofrecer esto.
```

**Body copy (DE):**
```
Mallorca Verified ist eine unabhängige, datengetriebene Plattform, die die besten 
Hotels, Restaurants, Beach Clubs, Bootsverleih und Aktivitäten der Insel bewertet — 
basierend auf echten Google-Bewertungsdaten und einem objektiven Scoring-Algorithmus.

Jedes Unternehmen, mit dem wir zusammenarbeiten, erhält einen angereicherten, 
verifizierten Eintrag auf Mallorca Verified. Das bedeutet eine zusätzliche 
Online-Präsenz, Backlink-Autorität und Sichtbarkeit auf einer Plattform, die 
speziell dafür entwickelt wurde, von KI-Suchmaschinen wie ChatGPT und Perplexity 
zitiert zu werden, wenn Reisende und Zuzügler nach Mallorca fragen.

Keine andere Agentur auf der Insel kann das bieten.
```

**Right column:** A clean text block styled like a "verified listing card" — visually suggests what an MV listing looks like. Dark card, business name, sector badge, score indicator. This is a UI mockup in code, not an image. Keep it minimal and on-brand.

**CTA below copy:**
- EN: `Visit mallorcaverified.com →`
- ES: `Visitar mallorcaverified.com →`
- DE: `mallorcaverified.com besuchen →`

Link opens in new tab.

---

### 10. Contact CTA section

**Background:** `#0A0A0A`. Full-bleed, generous vertical padding `py-32`.

**Layout:** Centred. Headline, subheadline, form below.

**Headline:**
- EN: `Ready to be found?`
- ES: `¿Listo para que te encuentren?`
- DE: `Bereit, gefunden zu werden?`

**Subheadline:**
- EN: `Request a free audit. We'll analyse your current digital visibility and show you exactly where the gaps are — no commitment required.`
- ES: `Solicita una auditoría gratuita. Analizaremos tu visibilidad digital actual y te mostraremos exactamente dónde están las oportunidades — sin compromiso.`
- DE: `Fordern Sie ein kostenloses Audit an. Wir analysieren Ihre aktuelle digitale Sichtbarkeit und zeigen Ihnen genau, wo die Lücken sind — unverbindlich.`

**Form fields:**
1. Name — text input
2. Business name — text input
3. Email — email input
4. Website — text input (optional)
5. Message — textarea (optional), placeholder:
   - EN: `Anything you'd like us to know about your business or goals (optional)`
   - ES: `Algo que quieras que sepamos sobre tu negocio u objetivos (opcional)`
   - DE: `Was sollen wir über Ihr Unternehmen oder Ihre Ziele wissen? (optional)`

**Submit button:** Full width, accent gold, Inter 500:
- EN: `Send request`
- ES: `Enviar solicitud`
- DE: `Anfrage senden`

**Success state:** Replace form with:
- EN: `We've received your request. You'll hear from us within 24 hours.`
- ES: `Hemos recibido tu solicitud. Te responderemos en menos de 24 horas.`
- DE: `Wir haben Ihre Anfrage erhalten. Sie hören innerhalb von 24 Stunden von uns.`

**Form submission:** POST to `/api/contact/route.ts`. Send email notification via Resend or Nodemailer. Store submission in a simple log or forward to email. No database needed at launch.

---

### 11. Footer

**Background:** `#0A0A0A`. Top border `1px solid #222222`.

**Layout:** 4-column grid (desktop), stacked (mobile). Style reference: Flair Digital footer.

```
Col 1: Navigation          Col 2: Social              Col 3: Contact             Col 4: Legal
--------                   --------                   --------                   --------
Home                       LinkedIn                   hello@tramuntanadigital.com Privacy policy
Visibility check           Instagram                  Mallorca, Spain            © 2026 Tramuntana
Mallorca Verified ↗                                                              
Free audit                                                                       
```

**Bottom of footer:** The brand name "Tramuntana" in very large Playfair Display (clamp 6rem, 15vw, 14rem), `#161616` — visible but extremely dark, almost hidden in the background. Not readable at a glance, only apparent on close inspection. This is the signature aesthetic moment borrowed from Flair — the oversized footer wordmark. Do NOT make it white or accent coloured — it must be near-invisible, a texture.

Language switcher also present in footer for mobile users: `EN · ES · DE`

---

## SEO & metadata

```typescript
// app/[lang]/layout.tsx
export const metadata = {
  title: {
    default: 'Tramuntana Digital — Digital Marketing Mallorca',
    template: '%s | Tramuntana Digital'
  },
  description: 'SEO, GEO/AI search optimisation and digital marketing for hotels, boat charter and luxury businesses in Mallorca. Get found — and chosen.',
  keywords: ['digital marketing Mallorca', 'SEO Mallorca', 'GEO search Mallorca', 'hotel marketing Mallorca', 'AI search optimisation Mallorca'],
  openGraph: {
    type: 'website',
    siteName: 'Tramuntana Digital',
    locale: 'en_GB',
  },
  alternates: {
    canonical: 'https://tramuntanadigital.com',
    languages: {
      'en': 'https://tramuntanadigital.com/en',
      'es': 'https://tramuntanadigital.com/es',
      'de': 'https://tramuntanadigital.com/de',
    }
  }
}
```

**JSON-LD schema** — add to root layout:
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Tramuntana Digital",
  "description": "Digital marketing agency in Mallorca specialising in SEO, GEO/AI search optimisation and full-service digital marketing for luxury and internationally-oriented businesses.",
  "url": "https://tramuntanadigital.com",
  "areaServed": {
    "@type": "Place",
    "name": "Mallorca, Balearic Islands, Spain"
  },
  "serviceType": ["SEO", "GEO optimisation", "AI search optimisation", "Social media management", "Web design", "Marketing automation"],
  "inLanguage": ["en", "es", "de"]
}
```

---

## Environment variables

```
ANTHROPIC_API_KEY=           ← Claude API for visibility calculator
RESEND_API_KEY=              ← Email delivery for contact form (or use Nodemailer + SMTP)
CONTACT_EMAIL=               ← Where contact form submissions are sent
NEXT_PUBLIC_SITE_URL=        ← https://tramuntanadigital.com
```

Never expose `ANTHROPIC_API_KEY` client-side. All Claude API calls go through `/api/visibility/route.ts`.

---

## Performance requirements

- Lighthouse score target: 95+ on Performance, 100 on Accessibility, 100 on Best Practices, 100 on SEO
- No layout shift (CLS = 0) — reserve space for calculator result before it loads
- Font loading: `display: swap` on both Playfair Display and Inter
- Images: none at launch (intentionally text/type-only design). If any are added later, use `next/image` with explicit width/height
- No third-party scripts at launch except Vercel Analytics (add after go-live)

---

## Codex build instructions

Build the entire landing page as a single Next.js 15 project. Do not scaffold placeholder components — build the real content from this CODEX.

Build order:
1. Project setup + Tailwind config + font loading + CSS custom properties
2. i18n dictionaries (en.ts, es.ts, de.ts) with all copy from this CODEX
3. AnimatedSection wrapper component (Framer Motion scroll reveal)
4. Navbar with LanguageSwitcher
5. All sections in order: Hero → Problem → Services → Calculator → WhyTramuntana → Testimonials → MallorcaVerified → ContactCTA
6. Footer with oversized wordmark
7. API routes: /api/visibility and /api/contact
8. Metadata + JSON-LD schema

Do not invent copy. Use only the copy specified in this CODEX for each language. Do not add sections not specified here. Do not add imagery unless explicitly described. Do not add third-party UI libraries — Tailwind + Framer Motion only.

When in doubt about a design decision not covered here: choose the more minimal option.
```