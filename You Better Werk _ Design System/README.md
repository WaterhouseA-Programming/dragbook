# You Better Werk — Design System

> **The UK's drag booking marketplace.** Discover, book, and celebrate drag talent ready to slay any event.

## Sources

- **Logo:** `assets/logo.png` (AI-generated brand mark — neon marquee sign with crown, hot-pink "YOU BETTER WERK" lettering, gold frame, lip and lash accoutrements)
- **Codebase:** GitHub repo `WaterhouseA-Programming/dragbook` (branch: `master`) — 4 HTML pages: homepage, browse, profile, pricing
- **No Figma provided** — design system derived entirely from codebase inspection

---

## Product Overview

**You Better Werk** (brand name / parent) operates **DragBook** (product name) — the UK's first dedicated drag performer marketplace. Think Airbnb or Depop, but for booking drag acts.

### The Problem
Drag performers are unfindable unless you already know their name. Agencies like rent-a-queen charge 20–35% and only represent their own roster. There's no central, open, transparent marketplace.

### The Solution
DragBook is a two-sided marketplace:
- **Demand side:** Event organisers (hen parties, corporates, weddings, pride events, birthdays)
- **Supply side:** Individual drag performers (queens, kings, non-binary performers)

### Business Model
- Free to list (basic profile)
- Pro (£19/mo) and Elite (£39/mo) subscription tiers for performers
- 3% platform booking fee on confirmed bookings
- Featured placement upsells

### Pages / Surfaces
| Page | File | Description |
|------|------|-------------|
| Homepage | `dragbook.html` | Hero + search + performer cards + how it works + testimonials |
| Browse | `dragbook-browse.html` | Filtered grid of performers with sidebar facets |
| Profile | `dragbook-profile.html` | Individual performer page with booking widget |
| Pricing | `dragbook-pricing.html` | Tier comparison + commission explainer + FAQ |

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Sassy, warm, and camp** — the brand speaks like a drag queen who also happens to be brilliant at marketing
- **Tongue-in-cheek without being alienating** — corporate bookers must feel safe; the humour is inclusive, not niche
- **Confident, not boastful** — "The UK's First Dedicated Drag Marketplace" stated as fact, not claim
- Drag vocabulary is used naturally: *slay*, *fabulous*, *werk*, *carnage*, but never forced
- The copy winks at the audience. It knows it's selling something fun and it leans into it

### Casing & Punctuation
- Headlines: **Title Case** for section eyebrows, **Sentence case** for long-form headings
- Nav items: UPPERCASE with letter-spacing
- Tags and badges: Title Case or ALL CAPS (small, spaced)
- Taglines often end with a punchy monosyllable: *"Book. Slay. Repeat."*, *"Pure fabulousness."*
- Italics used in headings for the emphatic/colourful word: *"Find Your Perfect **Drag Star**"*

### Copy Examples (from codebase)
- Hero: *"Book Extraordinary Drag Talent"* / *"From hen parties to corporate events, find and book verified drag performers across the UK. Direct booking, no agency fees, pure fabulousness."*
- CTA: *"Find a Queen 👑"*, *"List Your Act Free 💄"*, *"Book Scarlett →"*
- Testimonial style: conversational, specific, name + role + location
- Pricing: plain-spoken anti-agency messaging — *"No agency taking a cut. No gatekeeping. Just you, your talent, and the bookings you deserve."*

### Emoji Usage
Emoji are used — **sparingly and purposefully** — in CTAs and badges, never in body copy:
- 👑 Crown: "premium" / "find a queen"
- 💄 Lipstick: "for performers" / "list your act"
- ✨ Sparkle: energy / excitement
- 🔍 Search CTA
- ◆ Diamond: marquee divider (not an emoji, a unicode char)

### Perspective
- Platform speaks as **"we"** (DragBook), but rarely needs to
- Addresses bookers as **"you"** directly
- Addresses performers warmly, as community: *"This Is Your Platform."*

---

## VISUAL FOUNDATIONS

### Color System
See `colors_and_type.css` for full tokens.

| Token | Value | Use |
|-------|-------|-----|
| `--hot-pink` | `#FF2D78` | Primary action, borders, accents, eyebrow bars |
| `--electric-purple` | `#9B00FF` | Gradient partner to hot-pink |
| `--acid-yellow` | `#FFE600` | Stars, savings, "hot" badges, highlights |
| `--cyan` | `#00F5FF` | "Verified" badges, third gradient color |
| `--deep-black` | `#0A0008` | Page background |
| `--card-bg` | `#1A0020` | Card / panel backgrounds |
| `--card-bg-2` | `#150018` | Footer, secondary panels |
| `--text-light` | `#FFE8FF` | Primary text (warm white with slight pink tint) |
| `--text-muted` | `#C084C8` | Secondary text, labels, placeholders |

**Primary gradient:** `linear-gradient(135deg, #FF2D78, #9B00FF)` — used on buttons, stat numbers, dividers  
**Triple gradient:** `linear-gradient(135deg, #FF2D78, #9B00FF, #00F5FF)` — logo wordmark  
**Yellow accent gradient:** `linear-gradient(135deg, #FFE600, #FF2D78)` — logo tagline, "hot" states

### Typography
- **Abril Fatface** — Display / logo wordmark. Large numerals, marquee text
- **Playfair Display** (700/900, italic) — Section headings, card names, prices. The "editorial" voice
- **DM Sans** (300/400/500) — All body, nav, labels, buttons. Clean, modern, legible

### Backgrounds & Textures
- Deep near-black (`#0A0008`) — whole-page background
- Animated **glitter canvas** (fixed, z-index 0, pointer-events none, 0.2–0.4 opacity) — colored particles rising slowly; core visual signature of the brand
- **Radial gradient blobs** behind hero sections (purple/pink at different ellipses, ~15% opacity)
- No photography used in codebase (placeholder emoji/gradients for performer images)
- Section backgrounds use `rgba(255,255,255,0.02–0.05)` frosted tints

### Cards
- `border-radius: 20–28px` — very rounded
- Border: `1px solid rgba(255,255,255,0.06)` — barely-there
- Background: `#1A0020`
- Hover: `translateY(-6 to -8px) scale(1.01)` + `box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,45,120,0.15)` + border color shifts to `rgba(255,45,120,0.3)`
- Featured cards: gradient border + `linear-gradient(145deg, rgba(155,0,255,0.2), rgba(255,45,120,0.2))` background

### Buttons
- **Primary:** `linear-gradient(135deg, #FF2D78, #9B00FF)`, pill-shaped (`border-radius: 100px`), white text, glow on hover
- **Secondary:** transparent + `1px solid rgba(255,255,255,0.2)`, hover → pink border + pink text + subtle lift
- **Nav CTA:** Same as primary + `box-shadow: 0 0 20px rgba(255,45,120,0.4)`

### Borders & Dividers
- Cards: `rgba(255,255,255,0.06)`
- Section dividers: `rgba(255,255,255,0.05)`
- Focus/active: `rgba(255,45,120,0.3)` — hot pink  
- Section eyebrow: 32px hot-pink `::before` bar + uppercase spaced text

### Shadows & Glow
- Hover glow: `box-shadow: 0 0 40–60px rgba(255,45,120,0.15–0.5)`
- Logo glow: `filter: drop-shadow(0 0 40px rgba(255,45,120,0.5))`
- Glitter particles: `ctx.shadowBlur = 6; ctx.shadowColor = particle.color`
- No inset shadows used

### Animation
- Scroll reveal: `fade-up` class — `opacity: 0; transform: translateY(30–40px)` → visible via IntersectionObserver
- Entry animations: `fadeSlideDown` keyframe (opacity 0 → 1, translateY -20 → 0), staggered 0.1s delays
- Marquee: `animation: marquee 20s linear infinite`
- Hover transitions: `0.2–0.3s ease` for transforms; `0.3s` for color/border changes
- Custom cursor: ring (hot-pink, mix-blend-mode: screen) + dot (acid-yellow). Scales to 2x on hover over interactive elements
- Sparkle float: `translateY` + rotate oscillation, `4s infinite`

### Corner Radii
- Page/hero: no radius
- Cards: `20–24px`  
- Price/featured cards: `28–32px`
- Buttons: `100px` (pill)
- Tags/badges: `100px` (pill)
- Avatar/thumbnail: `50%` (circle) or `12–16px`
- Inputs: `12–16px`

### Imagery & Color Vibe
- No real photography in codebase — performer images are emoji + gradient placeholders
- Recommended imagery: high-contrast, saturated, warm-lit. Think stage lighting, neon, glitter
- Color grade: purple-to-pink tones, neon highlights, dark backgrounds

### Layout
- Max content width: ~1100–1200px centered
- Section padding: `100px 60px` desktop, `80px 24px` mobile
- Nav: fixed, full-width, `backdrop-filter: blur(10–20px)`, dark gradient-to-transparent
- Grid systems: CSS Grid, `auto-fill minmax()` for performer cards

### Hover / Press States
- Links: color shift + `::after` underline slides in (width 0 → 100%)
- Cards: `translateY(-6 to -8px)` lift + pink glow
- Buttons primary: `translateY(-2 to -3px) scale(1.02)` + heavier glow
- Buttons secondary: border + text color → hot-pink
- Social icons: `translateY(-2 to -3px)` + pink bg tint
- No press/active states explicitly defined (lift + glow covers it)

### Transparency & Blur
- Nav: `backdrop-filter: blur(10–20px)` over dark tinted bg
- Search bar: `backdrop-filter: blur(20px)` + `rgba(255,255,255,0.05)` fill
- Card badges (floating): `backdrop-filter: blur(10px)` + dark semi-transparent bg
- Booking widget: transparent but elevated via border + shadow

---

## ICONOGRAPHY

No custom icon system or icon font in the codebase. Icons are handled in three ways:

1. **Emoji** — used as functional icons in CTAs, category tags, stat strips, social buttons, and decorative overlays. Key set: 👑 💄 ✨ 🔍 📍 ★ ◆ 💜 ⚡ 💎 🌈 🔥 🎤 🎭 💌 🌙 🦋
2. **Unicode characters** — `◆` used as marquee dividers; `★` used for star ratings
3. **Inline text symbols** — `→` for "book/view" CTAs; `✓` for feature check marks; `×` for filter removal; `+` for FAQ toggle

**CDN Icon recommendation:** Since no icon font exists, the closest suitable CDN library matching the stroke/feel would be **Lucide Icons** (light stroke, modern) — but the codebase does NOT currently use it. Emoji remain the primary icon system.

**Social icons** are represented with emoji (📸 Instagram, 🎵 TikTok, 🐦 Twitter/X, 💼 LinkedIn).

---

## File Index

```
/
├── README.md                     ← This file
├── SKILL.md                      ← Agent skill definition
├── colors_and_type.css           ← Full CSS token system + font imports
├── assets/
│   └── logo.png                  ← You Better Werk brand logo (marquee sign)
├── preview/
│   ├── colors-brand.html         ← Brand color swatches
│   ├── colors-semantic.html      ← Semantic/surface colors
│   ├── type-display.html         ← Display type scale
│   ├── type-body.html            ← Body type scale
│   ├── type-specimens.html       ← Type in use
│   ├── spacing-radii.html        ← Border radii tokens
│   ├── spacing-shadows.html      ← Shadow & glow system
│   ├── components-buttons.html   ← Button variants
│   ├── components-badges.html    ← Badges & tags
│   ├── components-cards.html     ← Performer card component
│   ├── components-forms.html     ← Input, select, search bar
│   └── brand-logo.html           ← Logo display
└── ui_kits/
    └── website/
        ├── README.md             ← UI kit docs
        └── index.html            ← Full interactive website prototype
```
