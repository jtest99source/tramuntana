# Tramuntana Digital — Visual Redesign Prompt for Claude Code

You are doing a **visual-only redesign** of the Tramuntana Digital website.
Do NOT change copy, routing, i18n keys, API logic, or component structure.
Only touch: CSS, Tailwind classes, font imports, spacing, colour tokens, and visual treatment of existing JSX elements.

---

## STEP 0 — Read before touching anything

1. Read `CODEX.md` fully.
2. Read `app/globals.css` fully.
3. Read `next.config.ts` to confirm if Tailwind v3 or v4 is in use.
4. Read `package.json` to check exact versions of tailwindcss, next, and any font packages.
5. Read `tailwind.config.*` if it exists (may be `tailwind.config.ts` or `tailwind.config.js`).
6. Read every file listed below before editing any of them:
   - `app/layout.tsx`
   - `app/[lang]/layout.tsx`
   - `components/nav/Navbar.tsx`
   - `components/sections/Hero.tsx`
   - `components/sections/Services.tsx`
   - `components/sections/Calculator.tsx`
   - `components/sections/Testimonials.tsx`
   - `components/sections/WhyTramuntana.tsx`
   - `components/sections/MallorcaVerified.tsx`
   - `components/sections/ContactCTA.tsx`
   - `components/footer/Footer.tsx`
   - `components/ui/ScoreDisplay.tsx`

Report what font system is currently in use (next/font, Google Fonts link tag, or CSS import) before proceeding.

---

## STEP 1 — Typography: replace font stack

### Fonts to add
- **Display / Headlines:** `Fraunces` — variable serif (opsz, wght axes). Used for all h1, h2, pull quotes, and the italic gold accent words.
- **Body / UI:** `DM Sans` — geometric humanist sans. Used for body copy, nav, buttons, labels, form fields.
- **Mono / Data:** `DM Mono` — for score numbers, section eyebrows, stat callouts, form labels, attribution lines.

### If the project uses `next/font/google` (check app/layout.tsx):
Replace or extend the existing font import. Add:

```ts
import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

Apply all three variables to the `<html>` or `<body>` className in `app/layout.tsx`:
```tsx
<html className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
```

### If the project uses a Google Fonts `<link>` tag:
Replace with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

---

## STEP 2 — Design tokens in globals.css

At the top of `app/globals.css`, inside `:root`, add or replace with these tokens:

```css
:root {
  /* Fonts */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'DM Mono', monospace;

  /* Type scale */
  --text-hero: clamp(48px, 7.5vw, 92px);
  --text-h2: clamp(30px, 4vw, 52px);
  --text-h3: clamp(20px, 2.5vw, 28px);
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-sm: 14px;
  --text-xs: 12px;

  /* Line heights */
  --leading-hero: 1.0;
  --leading-h2: 1.15;
  --leading-body: 1.65;

  /* Letter spacing */
  --tracking-hero: -0.02em;
  --tracking-tight: -0.015em;
  --tracking-wide: 0.08em;
  --tracking-caps: 0.12em;

  /* Colours */
  --color-bg: #0A0A08;
  --color-surface: #111110;
  --color-surface-raised: #1A1A18;
  --color-border: #2A2A26;
  --color-border-accent: #3D3830;

  --color-text-primary: #F0EDE6;
  --color-text-secondary: #9A9488;
  --color-text-tertiary: #5C5850;

  --color-gold: #C9A84C;
  --color-gold-light: #E8C96A;
  --color-gold-muted: #8B7235;
  --color-gold-bg: rgba(201, 168, 76, 0.06);

  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 32px;
  --space-lg: 64px;
  --space-xl: 96px;
  --space-2xl: 128px;
}
```

Then add these global base styles (after the :root block):

```css
body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: var(--leading-h2);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

/* Section eyebrow utility */
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 20px;
}

/* Gold rule utility */
.gold-rule {
  display: block;
  width: 80px;
  height: 1px;
  background: var(--color-gold);
  margin-bottom: 28px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### If using Tailwind v3 — extend tailwind.config.ts:

```ts
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-display)'],
      body: ['var(--font-body)'],
      mono: ['var(--font-mono)'],
    },
    colors: {
      bg: 'var(--color-bg)',
      surface: 'var(--color-surface)',
      'surface-raised': 'var(--color-surface-raised)',
      border: 'var(--color-border)',
      'border-accent': 'var(--color-border-accent)',
      'text-primary': 'var(--color-text-primary)',
      'text-secondary': 'var(--color-text-secondary)',
      'text-tertiary': 'var(--color-text-tertiary)',
      gold: 'var(--color-gold)',
      'gold-light': 'var(--color-gold-light)',
      'gold-muted': 'var(--color-gold-muted)',
    },
  },
}
```

---

## STEP 3 — Navbar.tsx

Read the current file. Apply these visual changes only:

**Logo "Tramuntana":**
- Font: `font-display` (Fraunces), weight 700, tracking tight
- "DIGITAL" sub-label: `font-mono`, `text-xs`, `tracking-[0.12em]`, `uppercase`, `text-gold`

**Nav links / language switcher:**
- Font: `font-mono`, `text-xs`, `tracking-wide`
- Default colour: `text-text-secondary`
- Active/current: `text-text-primary` + `border-b border-text-primary`
- Gap between EN / ES / DE: `gap-3`

**"Free audit" button:**
```
border border-gold text-gold font-body font-medium text-xs tracking-[0.08em] uppercase
px-5 py-2.5 rounded-sm
transition-colors duration-150
hover:bg-gold hover:text-bg
```

**Nav container:**
- `border-b border-[var(--color-border)]`
- Background: `bg-[var(--color-bg)]`
- If sticky/fixed: add `backdrop-blur-sm bg-[var(--color-bg)]/90`

---

## STEP 4 — Hero.tsx

Read the current file first. Apply:

**Above the h1, add a visual anchor group:**
```tsx
<span className="eyebrow">Digital Marketing · Mallorca</span>
<span className="gold-rule" aria-hidden="true" />
```
(These are defined as utility classes in globals.css above. If the eyebrow already exists as a different element, style it to match.)

**The main h1:**
- `font-display` (Fraunces), weight 700
- `text-[var(--text-hero)]`
- `leading-[1.0]`
- `tracking-[var(--tracking-hero)]`
- `max-w-[820px]`
- Colour: `text-[var(--color-text-primary)]`

**The italic gold word ("visible" or equivalent accent word):**
- Add: `italic text-[var(--color-gold)] font-extrabold` to that specific `<em>` or `<span>`
- If it's rendered via `lib/em.tsx`, update that component to apply these classes

**The secondary/subtitle text below the h1:**
- `font-body`, `text-body-lg`, `text-[var(--color-text-secondary)]`, `leading-[1.65]`, `max-w-[520px]`

---

## STEP 5 — Services.tsx

Read the current file. Apply:

**Section wrapper:**
- `py-[var(--space-xl)]`
- Add eyebrow above heading: `<span className="eyebrow">What We Do</span>`

**Section heading:**
- `font-display`, `text-[var(--text-h2)]`, `leading-[1.15]`, `font-semibold`, `max-w-[560px]`

**Each service row** (whatever element currently wraps each service):
- `flex items-baseline gap-6 py-5 border-b border-[var(--color-border)]`
- First row: also `border-t border-[var(--color-border)]`
- On hover: `hover:bg-[var(--color-surface)] transition-colors duration-150`
- Add `group` class to the row element

**Service name (left column):**
- `font-body font-semibold text-[var(--text-body-lg)] text-[var(--color-text-primary)] min-w-[200px]`
- On hover (via group): `group-hover:text-[var(--color-gold)] transition-colors duration-150`

**Service descriptor (right column):**
- `font-body text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[1.65]`

**Arrow indicator** — add after descriptor in each row:
```tsx
<span className="ml-auto font-mono text-[var(--color-gold-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true">→</span>
```

---

## STEP 6 — Calculator.tsx (Visibility Audit form)

Read the current file. This is the primary mid-page CTA — treat it accordingly.

**Section wrapper:**
- `bg-[var(--color-gold-bg)] border-y border-[var(--color-border-accent)] py-[var(--space-xl)]`

**Add eyebrow above heading:**
```tsx
<span className="eyebrow">Free Visibility Audit</span>
```

**Section heading:**
- `font-display text-[var(--text-h2)] font-semibold max-w-[420px] leading-[1.15]`

**Trust line under heading** (add if not present, or style if present):
- `font-body text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-3 max-w-[380px] leading-[1.65]`

**All `<input>` and `<select>` fields:**
```
bg-[var(--color-surface)]
border border-[var(--color-border)]
rounded-sm
px-4 py-3
font-body text-[var(--text-body)] text-[var(--color-text-primary)]
placeholder:text-[var(--color-text-tertiary)]
focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20
transition-colors duration-150
w-full
```

**Submit button:**
```
bg-[var(--color-gold)] text-[var(--color-bg)]
font-body font-semibold text-[var(--text-sm)] tracking-[0.08em] uppercase
px-8 py-3.5 rounded-sm w-full
border-none cursor-pointer
hover:bg-[var(--color-gold-light)] transition-colors duration-150
```

---

## STEP 7 — WhyTramuntana.tsx

Read the current file. Apply:

**Add eyebrow:**
```tsx
<span className="eyebrow">Why Tramuntana</span>
```

**Section heading:**
- `font-display text-[var(--text-h2)] font-semibold leading-[1.15]`

**Each feature/bullet item** — replace default list styling:
```tsx
<li className="flex items-start gap-3 mb-4">
  <span className="font-mono text-[var(--color-gold)] mt-0.5 shrink-0" aria-hidden="true">→</span>
  <span className="font-body text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[1.65]">
    {/* existing text */}
  </span>
</li>
```

---

## STEP 8 — Testimonials.tsx

Read the current file. This is currently rendered as small identical cards. Replace with large pull-quote style.

Remove card backgrounds and borders. For each testimonial, apply:

**Quote text:**
- `font-display italic text-[clamp(18px,2vw,24px)] font-normal text-[var(--color-text-primary)] leading-[1.45] max-w-[580px]`
- Prepend a large opening quote mark as a styled element:
  ```tsx
  <span className="font-display text-[4em] text-[var(--color-gold)] leading-none align-[-0.3em] mr-1 select-none" aria-hidden="true">"</span>
  ```

**Attribution line (name, company, role):**
- `font-mono text-[var(--text-xs)] text-[var(--color-text-secondary)] tracking-[0.12em] uppercase mt-5`
- Company name specifically: `text-[var(--color-gold)]`

**Divider between testimonials:**
- `border-t border-[var(--color-border)] my-12`

**Layout:** Switch to `flex flex-col max-w-[680px] mx-auto` if currently a grid.

---

## STEP 9 — MallorcaVerified.tsx

Read the current file. Apply:

**Add eyebrow:**
```tsx
<span className="eyebrow">Exclusive to Tramuntana Clients</span>
```

**Section heading:**
- `font-display text-[var(--text-h2)] font-semibold leading-[1.15]`

**Business card (the Balm Restaurant / score card):**
- `bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] p-7`

**Read ScoreDisplay.tsx and apply to the score number:**
- `font-mono text-[64px] font-medium text-[var(--color-gold)] leading-none`
- "/100" label: `font-mono text-[var(--text-sm)] text-[var(--color-text-tertiary)] align-bottom pb-2`

**Business name in card:**
- `font-display text-[var(--text-h3)] font-semibold text-[var(--color-text-primary)]`

**Category / location label:**
- `font-mono text-[var(--text-xs)] text-[var(--color-text-secondary)] tracking-[0.12em] uppercase mt-1`

**"Objective Mallorcan score" label:**
- `font-mono text-[var(--text-xs)] text-[var(--color-gold-muted)]`

---

## STEP 10 — ContactCTA.tsx

Read the current file. This is the final CTA form section.

**Section wrapper:**
- `py-[var(--space-xl)]`

**Inner container:**
- `max-w-[560px] mx-auto text-center`

**Add eyebrow:**
```tsx
<span className="eyebrow" style={{display: 'block', textAlign: 'center'}}>Get Started</span>
```

**Heading:**
- `font-display text-[var(--text-h2)] font-bold leading-[1.1] tracking-[var(--tracking-hero)]`

**Subtitle / description:**
- `font-body text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[1.65] max-w-[440px] mx-auto mt-4`

Apply identical form field and submit button styles as Step 6 (Calculator.tsx).

---

## STEP 11 — Footer.tsx

Read the current file. Apply:

**Footer container:**
- `border-t border-[var(--color-border)] pt-[var(--space-lg)]`
- Background: `bg-[var(--color-bg)]`

**Footer nav links:**
- `font-body text-[var(--text-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150`

**Legal / copyright / address line:**
- `font-mono text-[var(--text-xs)] text-[var(--color-text-tertiary)]`

**Ghost wordmark at bottom** — add as the last element inside the footer (after all nav/legal content):
```tsx
<div className="mt-16 overflow-hidden select-none pointer-events-none" aria-hidden="true">
  <span className="font-display font-extrabold text-[clamp(40px,8vw,100px)] text-[var(--color-surface-raised)] tracking-[-0.02em] leading-none">
    Tramuntana
  </span>
</div>
```
This is the **signature element** of the redesign — a large ghost wordmark anchoring the page close. It should be barely visible (colour is --color-surface-raised, almost the same as background).

---

## STEP 12 — AnimatedSection.tsx

Read the current file. If it uses `framer-motion` or CSS transitions for scroll-triggered reveals:
- Ensure all transitions are wrapped with a `prefers-reduced-motion` check
- Keep animations minimal: `opacity 0→1`, `translateY 16px→0`, duration 400ms max
- Remove any bounce, scale, or rotation effects if present

---

## FINAL CHECKS — do these after all edits

1. Run `npm run build` (or `next build`). Fix any TypeScript or import errors — do not leave build-breaking changes.
2. Verify the three Google Fonts / next/font variables are applied to `<html>` in `app/layout.tsx`.
3. Confirm `var(--font-display)`, `var(--font-body)`, `var(--font-mono)` are resolvable — they must be set in both `:root` CSS AND via the next/font `variable` prop if using next/font.
4. Check that no existing Tailwind `font-sans` or `font-serif` class overrides the new font stack at the body level.
5. Confirm `text-[var(--color-text-primary)]` is `#F0EDE6` not `#FFFFFF` everywhere.
6. Confirm the gold rule and eyebrow appear above the hero h1.
7. Confirm the ghost "Tramuntana" wordmark is the last element in the footer.
8. Check mobile at 375px: hero headline should not overflow horizontally.

---

## WHAT NOT TO CHANGE — hard constraints

- All i18n keys and dictionary files (`lib/i18n/`)
- All API routes (`app/api/`)
- All routing and URL structure
- All props, TypeScript types (`types/`)
- All copy rendered from i18n dictionaries
- SEO meta tags, structured data, canonical URLs in layouts
- The Mallorca Verified scoring logic
- `lib/utils.ts` and `lib/em.tsx` (unless `em.tsx` needs a className update for the gold italic — read it first and only touch the className if needed)