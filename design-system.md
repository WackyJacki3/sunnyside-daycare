# Sunnyside Daycare — Design System

> Warm, play-based daycare in Langley, BC. This document is the single source of truth for visual language, spacing, type, components, and patterns. Use it to build new pages in Claude Design and to hand off to Claude Code.

**Recommended tech stack** — *Astro + Tailwind CSS + Alpine.js (optional, for tiny interactions)*

- **Astro** — static-first, zero JS by default, perfect for a content-heavy informational site. File-based routing for `/about`, `/programs`, `/our-space`, `/enrollment`, `/contact`. Built-in image optimization (`<Image>` component) is critical for the photo gallery on Our Space.
- **Tailwind CSS** — Maps cleanly to the design tokens below. Custom theme extension drives `text-ink`, `bg-bg-warm`, etc. Mobile-first responsive utilities (`md:`, `lg:`) cover all breakpoints below.
- **Alpine.js** (optional) — 4kb of vanilla-flavored reactivity for the mobile menu drawer and any form interactions. Anything more is over-engineering.
- **Netlify Forms** (or Formspree) — backend-free form handling for tour requests + waitlist.
- **Deploy** — Netlify, Vercel, or Cloudflare Pages, free tier.

Tailwind equivalents are noted alongside raw values throughout. Where a value falls between Tailwind's default scale, the closest stop is shown.

---

## 1. Color Palette

The palette is warm-cream with sunny orange and terracotta accents, anchored by a deep teal for ink and dark surfaces. All color tokens are defined in `tokens.css` and exposed via Tailwind's `theme.colors`.

| Name | Hex | Tailwind key | Where it's used |
|---|---|---|---|
| **Background / Cream** | `#FFFBF2` | `bg` | Page background, hero, programs section, day section, voices section, footer |
| **Background Warm** | `#FBEDD4` | `bg-warm` | Trust strip, approach section, space section, program card 1, voice cards, mobile menu accents |
| **Background Deep** | `#F5DDB5` | `bg-deep` | Hero blob secondary, voice avatar, tile fallback |
| **Ink / Text Primary** | `#1F2C32` | `ink` | Body text, headings, primary buttons, footer copy |
| **Ink 2 / Deep Teal** | `#2A4A55` | `ink-2` | Subheadings, secondary text, button borders, dark enrollment band background |
| **Muted Text** | `#5E6A6F` | `muted` | Meta info, captions, footer bottom strip |
| **Line / Border** | `#EADFC8` | `line` | Section dividers, card borders, nav bottom border on scroll |
| **Line Soft** | `#F1E8D4` | `line-soft` | Inner row dividers (day timeline items, mobile nav links) |
| **Accent / Sunny Orange** | `#F4A261` | `accent` | Brand mark fill, hero blob, "sticker" highlights, enrollment headline emphasis |
| **Accent 2 / Terracotta** | `#E76F51` | `accent-2` | Italic display emphasis (`<em>`), eyebrow underline, primary CTA hover, quote marks |
| **Accent 3 / Teal Complement** | `#2A9D8F` | `accent-3` | Reserved for charts/badges; sparingly used today |
| **Leaf / Sage** | `#6B9B7A` | `leaf` | Approach pillar "outside" accents, program card 3 tint, timeline dots (alt) |
| **Sun** | `#F4A261` | `sun` | Alias for accent; timeline dots (alt) |
| **Plum** | `#6B4F66` | `plum` | Reserved for dusk palette variant |

**Variant palettes** (Tweakable in the homepage prototype — keep these registered as alternates):

- **Meadow** — bg `#FBFAF2`, warm `#EDF2DF`, deep `#DCE7C8`, ink `#1F2A20`, ink-2 `#2A3D2E`, accent `#C8902F`, accent-2 `#6B9B5C`, leaf `#6B9B5C`, sun `#E0B43F`.
- **Dusk** — bg `#FFF7F2`, warm `#FBE3DA`, deep `#F5C9BD`, ink `#2B1F2A`, ink-2 `#4A2F44`, accent `#ED8975`, accent-2 `#C25E72`, accent-3 `#6B4F66`.

**Usage rules**

- **Never** use accent (orange) for body text — only for marks, fills, highlights, and italic display emphasis.
- **Always** pair `ink-2` (deep teal) with `bg` (cream) or `bg-warm` for the cleanest, warmest contrast.
- The enrollment band is the only dark surface — use it sparingly for emphasis.

---

## 2. Typography

### Font families

| Role | Family | Weights | Source |
|---|---|---|---|
| **Display** (headings, eyebrows, quotes) | **Newsreader** | 400, 500, 600; 400 italic, 500 italic | [Google Fonts](https://fonts.google.com/specimen/Newsreader) |
| **Body** (paragraphs, UI, captions) | **DM Sans** | 400, 500, 600, 700 | [Google Fonts](https://fonts.google.com/specimen/DM+Sans) |

**Google Fonts link (drop into `<head>` once):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">
```

### Type scale — Desktop (≥1024px)

| Style | Size | Weight | Line height | Family | Letter spacing | Notes |
|---|---|---|---|---|---|---|
| **Display / Hero** | 80px (5rem) | 500 | 1.05 | Newsreader | -0.015em | Hero `<h1>`. Cap at 14ch width for shape. |
| **H1 / Enrollment** | 64px (4rem) | 500 | 1.05 | Newsreader | -0.015em | Dark CTA band headline |
| **H2 / Section** | 48px (3rem) | 500 | 1.05 | Newsreader | -0.015em | All section heads (`.s-head h2`) |
| **H3 / Subhead** | 36px (2.25rem) | 500 | 1.1 | Newsreader | -0.01em | Program card titles |
| **H4 / Block** | 24px (1.5rem) | 500 | 1.15 | Newsreader | -0.005em | Day timeline rows, approach pillars |
| **Body Large** | 20px (1.25rem) | 400 | 1.5 | DM Sans | normal | Hero subtitle, enrollment body |
| **Body Regular** | 17px (1.0625rem) | 400 | 1.6 | DM Sans | normal | Default paragraphs |
| **Body Small** | 15px (0.9375rem) | 400 | 1.55 | DM Sans | normal | Card body, footer copy |
| **Caption / Label** | 13px (0.8125rem) | 600 | 1.4 | DM Sans | 0.16em (eyebrow) / 0.1em (age tag) | UPPERCASE on eyebrows + tags |
| **Mono / Time** | 17px | 500 italic | 1.2 | Newsreader | -0.005em | Day timeline times |

### Type scale — Mobile (≤560px)

| Style | Size | Weight | Line height | Notes |
|---|---|---|---|---|
| **Display / Hero** | 50px (3.125rem) | 500 | 1.05 | Tighter ch-width on `<h1>` to keep 2 lines |
| **H1 / Enrollment** | 42px (2.625rem) | 500 | 1.05 |  |
| **H2 / Section** | 32px (2rem) | 500 | 1.1 |  |
| **H3 / Subhead** | 26px (1.625rem) | 500 | 1.15 |  |
| **H4 / Block** | 21px (1.3125rem) | 500 | 1.2 |  |
| **Body Large** | 18px (1.125rem) | 400 | 1.5 |  |
| **Body Regular** | 15px (0.9375rem) | 400 | 1.6 |  |
| **Body Small** | 14px (0.875rem) | 400 | 1.55 |  |
| **Caption / Label** | 12px (0.75rem) | 600 | 1.4 |  |

> **Implementation note**: Type scales fluidly between desktop and mobile using `clamp()` — see `tokens.css` for the exact functions. You do not need to manually swap sizes per breakpoint; the clamp handles it. The discrete sizes above are the **start and end points** of the clamp.

### Typographic rules

- **Italic emphasis** in display headings uses `<em>` and is colored `--color-accent-2` (terracotta). This is the signature copy moment — exactly one italic word per headline, never more. *Examples:* "Where little ones grow into **themselves**." / "The rhythm of a **sunny** day."
- **Eyebrows** are UPPERCASE, 13px (12px mobile), letter-spacing 0.16em, weight 600, color `--color-ink-2`. They include a short colored rule (1.5px × 22px, `--color-accent-2`) before the text. Add `.eyebrow.center` for centered hero variants — adds a matching rule after the text.
- **Age tags** in program cards are UPPERCASE, 13px, letter-spacing 0.1em, weight 600, color `--color-accent-2`.
- **Quote marks** in testimonials use Newsreader at 3.5rem, color `--color-accent-2`, with negative bottom margin so the `<blockquote>` sits tucked beneath.
- **Never** use both Display and Body families together in a single paragraph; combine them only across sibling elements (e.g. H2 in Newsreader + adjacent description in DM Sans).
- **Display italic** is reserved for: emphasis in headings, the day-timeline time numerals, the footer tagline, and the testimonial blockquote. Do not use italic in body copy.

---

## 3. Spacing & Layout

### Base unit

- **4px base scale.** All spacing is a multiple of 4. Tailwind's default 4px scale aligns 1:1.

### Spacing scale

| Token | px | rem | Tailwind | Usage |
|---|---|---|---|---|
| `--spacing-xxs` | 4 | 0.25 | `1` | Hairline gaps |
| `--spacing-xs` | 8 | 0.5 | `2` | Icon ↔ label gap, inline meta separators |
| `--spacing-sm` | 12 | 0.75 | `3` | Button gap, sticker padding |
| `--spacing-md` | 16 | 1.0 | `4` | Card inner padding rows, paragraph blocks |
| `--spacing-lg` | 24 | 1.5 | `6` | Card padding, section heading bottom margin (small) |
| `--spacing-xl` | 32 | 2.0 | `8` | Hero CTA group bottom margin, card outer padding |
| `--spacing-2xl` | 48 | 3.0 | `12` | Section heading bottom margin, footer grid gap |
| `--spacing-3xl` | 80 | 5.0 | `20` | Hero column gap on desktop |

### Page container

- **Max content width**: `1200px`
- **Outer gutters**: `min(1200px, 92vw)` — uses 4% horizontal breathing room either side at any viewport.
- **Tailwind class**: `mx-auto w-[min(1200px,92vw)]`

### Section padding (vertical)

| Breakpoint | Top + Bottom | Source |
|---|---|---|
| **Desktop (≥960px)** | 110px (`6.875rem`) | `clamp(56px, 7vw, 110px)` |
| **Tablet (560–959px)** | 80px | Fluid clamp |
| **Mobile (≤559px)** | 56px (`3.5rem`) | Hard-set via media query |

The dark **Enrollment** band uses the same scale.

### Grid system

- **Desktop:** 12-column implicit grid via CSS Grid. The 1200px container is divided as needed per section:
  - Programs: `repeat(3, 1fr)` (3-up)
  - Approach: `repeat(3, 1fr)` (3-up)
  - Day timeline: `1fr 1.6fr` (photo left ~38% / content right ~62%)
  - Our Space: `repeat(12, 1fr)` (masonry-like with explicit `grid-column: span N`)
  - Voices: `repeat(3, 1fr)` (3-up)
  - Footer: `1.5fr 1fr 1fr 1fr`

- **Tablet (561–959px):** Most 3-up grids collapse to `1fr` (full width) or `repeat(2, 1fr)`; trust strip becomes 2×2; footer becomes 2×2.

- **Mobile (≤560px):** All grids → single column. Trust strip → single column with bottom borders.

### Gutters (column gaps)

| Context | Desktop gap | Mobile gap |
|---|---|---|
| Programs / Voices grids | 20px | 20px (vertical stack) |
| Approach grid | 28px | 28px |
| Day timeline (photo ↔ list) | 80px (clamp 32px–80px) | 32px |
| Our Space tiles | 14px | 14px |
| Footer columns | 40px | 32px |
| Hero (copy ↔ visual) | 80px (clamp 32px–80px) | 48px (stacked) |

---

## 4. Border Radius

Sunnyside leans into **generous, soft radii** — the visual signal of "warmth + safe for kids." Never use right angles on hero/program/space cards.

| Token | Value | Tailwind | Used on |
|---|---|---|---|
| `--radius-sm` | 12px | `rounded-xl` (12) | Menu button, mobile-menu close button |
| `--radius-md` | 18px | `rounded-[18px]` | Sticker pills, program icon container |
| `--radius-lg` | 20px | `rounded-3xl` (24) — closest | Enrollment stat cards |
| `--radius-xl` | 24px | `rounded-3xl` | Space tiles, voice cards |
| `--radius-2xl` | 28px | `rounded-[28px]` | Program cards, hero overlay copy block |
| `--radius-3xl` | 36px | `rounded-[36px]` | Day-visual photo frame, hero overlay image |
| `--radius-pill` | 999px | `rounded-full` | All buttons, label chips, dots |

- **Inputs** (forms not yet shown): use `--radius-sm` (12px) when added.
- **Avatars / dots**: always `50%` (`rounded-full`).

---

## 5. Shadows & Elevation

Sunnyside is a flat-ish design — shadows are reserved for affordance and floating UI moments (stickers, hover lift).

| Token | CSS value | Used on |
|---|---|---|
| `--shadow-sticker` | `0 12px 28px -16px rgba(31, 44, 50, 0.25)` | Floating hero stickers, label chips on tour photos |
| `--shadow-card-hover` | `0 18px 40px -22px rgba(31, 44, 50, 0.25)` | Program cards on hover (`:hover`) |
| `--shadow-enroll-glow` | `0 0 0 0` + a 320px blurred orange radial (see CSS) | Enrollment band ambient warmth |

**Rules**

- Default state of every card: **no shadow**, 1px border (`--color-line`). Hover adds the card-hover shadow.
- Sticker shadows are always behind a 1.5px border in `--color-line` — the combination reads as "label on the photo."
- Do not stack shadows. Pick one.

---

## 6. Buttons

All buttons are **pill-shaped** (`border-radius: 999px`), use **DM Sans 600**, and meet a **48px minimum tap target** on every breakpoint.

### Shared base

| Property | Desktop | Mobile |
|---|---|---|
| Padding | 14px 22px | 14px 22px (full-width on mobile via flex stretch in `.hero-ctas`) |
| Min height | 48px | 48px |
| Font size | 17px (1.0625rem) | 15px (0.9375rem) |
| Font weight | 600 | 600 |
| Border | 1.5px solid | 1.5px solid |
| Border radius | 999px | 999px |
| Transition | `transform .15s, background .15s, color .15s, border-color .15s` | same |
| Icon gap | 10px | 10px |

### Variants

**Primary** — main CTAs ("Book a tour")

| | Default | Hover |
|---|---|---|
| Background | `--color-ink-2` `#2A4A55` | `--color-ink` `#1F2C32` |
| Text | `--color-bg` `#FFFBF2` | `--color-bg` |
| Border | `--color-ink-2` | `--color-ink` |

**Secondary** — paired with primary ("See our programs", "Join the waitlist")

| | Default | Hover |
|---|---|---|
| Background | transparent | `--color-ink-2` |
| Text | `--color-ink-2` | `--color-bg` |
| Border | `--color-ink-2` | `--color-ink-2` |

**Ghost** — quiet tertiary (mobile menu call button)

| | Default | Hover |
|---|---|---|
| Background | `--color-bg` | `--color-bg` |
| Text | `--color-ink-2` | `--color-ink-2` |
| Border | `--color-line` | `--color-ink-2` |

**Accent** — reserved for a single high-emphasis moment (not currently used on homepage)

| | Default | Hover |
|---|---|---|
| Background | `--color-accent-2` | `--color-accent-2` filter:brightness(0.95) |
| Text | `#fff` | `#fff` |
| Border | `--color-accent-2` | `--color-accent-2` |

**Enrollment band variant** — when buttons sit on the dark band, primary swaps to orange-on-dark:

- Primary on dark: bg `--color-accent`, text `--color-ink-2`, border `--color-accent`. Hover → bg `--color-bg`.
- Secondary on dark: bg transparent, text `--color-bg`, border `rgba(bg, 40%)`.

**Tiny / compact nav button** — top-right "Book a tour" in desktop nav uses `padding: 10px 18px; min-height: 40px;` and the Secondary variant. This is the **only** place a button drops below 48px height (it's a tertiary action on desktop only; on mobile the same action is available as a full-height button in the menu drawer foot).

### Active state

All buttons get `transform: translateY(1px)` on `:active` for tactile feedback.

---

## 7. Components & Patterns

### Navigation bar (`.nav`)

**Desktop (≥960px)**

- Sticky to top of viewport (`position: sticky; top: 0; z-index: 50`).
- Background: cream at 88% opacity, with `backdrop-filter: saturate(150%) blur(12px)` — frosted glass effect.
- Adds a `1px solid --color-line` bottom border only after scroll (`.nav.scrolled` class added via JS at `scrollY > 8`).
- Inner: 1200px container, flex with three regions:
  1. **Brand** (left): 36px sun mark SVG + "Sunnyside" wordmark in Newsreader 500, 22.4px.
  2. **Primary nav** (center-right): 5 links — About, Programs, Our Space, Enrollment, Contact. 15.5px DM Sans 500. Hover: 1.5px terracotta underline grows from left.
  3. **CTA + hamburger** (right): "Book a tour" Secondary button (compact 40px height). Hamburger hidden on desktop.
- Padding: 18px top/bottom.

**Mobile (≤959px)**

- Same sticky behavior. Nav links and the CTA button hide; **hamburger button** (44×44px, 12px radius, 1.5px line border) shows in their place.
- Tapping the hamburger opens the **mobile menu drawer**:
  - Fixed full-viewport overlay (`inset: 0`), background `--color-bg`.
  - Slides down via `transform: translateY(-100%) → 0` with a 350ms cubic-bezier transition.
  - `overflow: hidden` on the drawer + `min-height: 0; overflow-y: auto` on the body — prevents foot section leaking out of the closed drawer.
  - **Head**: 18px vertical padding, brand on left, 44×44 close button on right, bottom 1px `--color-line` divider.
  - **Body**: 24px padding, large nav links in Newsreader 500, 1.6rem (2rem on tablet), each with a 1px `--color-line-soft` bottom divider.
  - **Foot**: 24px padding, stacked Primary "Book a tour" button + Ghost "Call us — (xxx)" button.
- Closes on link tap, close button click, or `Escape` key. Locks body scroll while open.

### Cards

Three card types appear, sharing a common pattern but differing in tone:

**Program card** (`.prog-card`)

- Background: `--color-bg-warm` (card 1), 22% orange tint on cream (card 2), 18% sage tint on cream (card 3) — visual rhythm via subtle tinting.
- Border: 1px `--color-line`.
- Radius: 28px.
- Padding: 28px 26px 30px (desktop); 24px 22px (mobile).
- Min-height: 380px desktop (`auto` on mobile so they don't get artificially tall when content is short).
- Internal structure: square icon block (56×56, 18px radius) → age tag (caption) → H3 title → 1-2 line description → bullet list (4 items, terracotta/teal/sage dots) → "Learn about …" link arrow at bottom (`margin-top: auto`).
- Hover: lift `translateY(-3px)` + apply `--shadow-card-hover`.
- **Mobile**: stack vertically with 20px gap. Padding tightens to 24px 22px.

**Voice card** (`.voice`)

- Background: `--color-bg-warm`, 1px `--color-line` border, 24px radius.
- Padding: 28px 26px (24px 22px mobile).
- Layout: oversize quote mark (3.5rem Newsreader, terracotta) at top, blockquote (1.2rem Newsreader 500, ink), then `<cite>` row at bottom: 36px circle avatar placeholder + 2-line attribution.
- **Mobile**: single column, blockquote drops to 1.08rem.

**Enrollment stat card** (`.enroll-stat`)

- Lives on dark enrollment band. Background `rgba(bg, 8%)`, border `rgba(bg, 18%)`, 20px radius, 22px 20px padding.
- Big number/text in Newsreader at section-4 scale, orange. Label in 14px DM Sans, dimmed cream.

### Hero visual (`.hero-visual`)

- Aspect ratio 4:5, max 540px wide.
- Two **organic blob shapes** drawn via `border-radius: 64% 36% 70% 30% / 40% 60% 40% 60%` (and a counter-rotated second blob) provide the warm backdrop.
- Photo placeholder (`<image-slot>`) overlays the blobs at `inset: 4% 6% 8% 4%` with 36px radius.
- Two **stickers** float at corners — `top: 8% right: -4%; rotate(4deg)` and `bottom: 12% left: -6%; rotate(-5deg)` — each a small pill with an emoji circle and 1-line text. They use the sticker shadow.
- **Mobile**: aspect ratio stays 4:5 but max-width drops to 420px; stickers tuck slightly inward to avoid clipping.

### Day timeline (`.day-list`)

- Two-column on desktop: sticky photo on left, timeline list on right.
- Each timeline item is a 3-column grid: `80px 24px 1fr` (time / dot / content).
- A 1.5px vertical line in `--color-line` runs through the dot column (`.day-list::before`, `left: 60px`).
- Dots are 14×14 circles with a 2px ring; rings cycle through terracotta, sage, and orange to add rhythm.
- 1px `--color-line-soft` divider between rows; final row no divider.
- **Mobile**: photo stacks above timeline. Time column shrinks to 64–70px.

### Space gallery (`.space-grid`)

- 12-column CSS grid containing 5 tiles in a **2 + 3 masonry**:
  - Row 1: tile 1 spans 7 cols (16:11), tile 2 spans 5 cols (4:3.5).
  - Row 2: tiles 3/4/5 each span 4 cols (4:3.5).
- Each tile: 24px radius, 1px line border, `<image-slot>` filling the tile, and a label chip in the bottom-left corner (cream pill, 6px 12px, 0.85rem 600, 1px line).
- **Tablet/mobile**: tiles each go full-width with 4:3 ratio.

### Trust strip (`.trust`)

- Horizontal band between hero and programs. `--color-bg-warm` background with line borders top + bottom.
- 4 equal items, each: 38px circle icon (cream with line border + stroked SVG) + 2-line label in 15px DM Sans.
- 1px `--color-line` between items.
- **Tablet**: 2×2. **Mobile (≤560px)**: single column with stacked bottom borders.

### Footer (`.footer`)

**Desktop**

- Background: `--color-bg` (cream), 1px `--color-line` top border, 80px top / 32px bottom padding.
- 4-column grid: brand+tagline (1.5fr), Visit (1fr), Get in touch (1fr), Explore links (1fr).
- Column headings are uppercase 13px DM Sans 600 in `--color-ink-2`, 0.1em letter-spacing.
- Brand tagline: Newsreader 1.15rem italic, 28ch max-width.
- Bottom strip: 24px padding above a 1px `--color-line` divider, flex row with copyright on left and "Family-run in Langley, BC" on right. 13.6px muted text. Wraps with 12px gap on small viewports.

**Mobile**

- Footer grid becomes 2-column at ≤959px, single column at ≤560px. Bottom strip wraps to two rows. Bottom padding stays at 32px.

### Eyebrows / section heads

- Every section uses the same `<div class="s-head">` two-column grid: H2 + Eyebrow on left, 36ch aside paragraph on right (aligned to baseline of H2).
- Spacing below: 48px to first content row.
- **Mobile**: collapses to single column with 14px gap.

### Icons

- All icons are 20–28px stroked SVGs, `stroke-width: 1.6–1.8`, `stroke-linecap: round`, `stroke-linejoin: round`. Stroke color is always currentColor or `--color-ink-2` so they pick up the surrounding text color.
- Brand mark is a 36×36 SVG: a sunny-orange `circle` with eight rotated stroke "rays" around it.
- **Never** use filled "duotone" icons or emoji-style icons in the UI chrome. Emoji is acceptable inside content stickers ("🌱 Outside every day") only.

### Dividers

- Always 1px `--color-line` or `--color-line-soft`. Never use a heavy divider color or thicker rule.

---

## 8. Responsive Breakpoints

A mobile-first approach. Tailwind's default breakpoints are used with one custom adjustment.

| Breakpoint | Range | What changes |
|---|---|---|
| **Mobile (`xs`)** | 0–559px | Single-column everything. Section padding tightens to 56px. Buttons in hero stack full-width. Trust strip → single column. Stickers tuck inward. Mobile menu link size drops to 1.6rem. Day-timeline time column → 64px. |
| **Tablet / wide mobile** | 560–959px | Programs/voices stay 1-column. Approach 1-column. Trust strip → 2×2. Day timeline stacks (photo above list). Footer → 2 columns. Hero stays single-column with image below. Section padding ~80px. |
| **Desktop (`md`)** | 960–1199px | All multi-column grids engage. Sticky nav with full links. Hero becomes 2-column. Container is 92vw, so columns are tight; gutters scale via `clamp()`. |
| **Desktop Large (`lg`)** | ≥1200px | Container caps at 1200px. Hero columns are spacious. Section padding hits its max 110px. |

**Tailwind config notes**

```js
// tailwind.config.js — recommended override
theme: {
  screens: {
    'xs': '560px',   // ← custom: matches our mobile breakpoint
    'sm': '640px',   // (default, unused in this design)
    'md': '960px',   // ← override: design breakpoint
    'lg': '1200px',  // ← override: container cap
  },
}
```

> **Implementation guidance for Claude Code**: Use Tailwind's mobile-first prefixes (`md:grid-cols-3 lg:gap-20`) rather than max-width queries. The current CSS uses `max-width:` queries for legacy reasons; new code should be mobile-first.

---

## 9. Imagery & Illustration Style

### Photography (the primary visual)

- **Subject**: Real moments of children playing, the space, food, garden, hands, materials. Candid > posed. Avoid stock photography.
- **Lighting**: warm, natural daylight. Sunny window light, golden hour. Never fluorescent / cold-toned.
- **Color**: lean into warm tones (sun, terracotta, soft wood). Greenery is welcome. Avoid heavy blues or grey-cast images.
- **Composition**: room for breath. Single child or small group focused on an activity, with negative space.
- **Aspect ratios used**:
  - Hero: 4:5 (portrait)
  - Day-visual: 4:5
  - Space tile 1 (large): 16:11
  - Space tiles 2–5: 4:3.5
  - On mobile, all tiles render 4:3
- **Treatment**:
  - All photos get rounded corners (24–36px depending on slot).
  - **Never** apply duotones, color filters, or B&W. The palette does the warming.
  - Decorative blob shapes appear *behind* the hero photo for whimsy; do not put them behind every photo.

### Illustration

- **Minimal and meaningful only.** This is not an illustrated brand.
- The **brand sun mark** is the only standing illustration: a filled circle with 8 stroked rays.
- Approach pillars use small stroked **glyph circles** (64×64 cream circle with a 1.5px ink-2 border + 28px SVG inside).
- No mascots, no characters, no hand-drawn body copy. Illustration is a garnish, not a category.

### Icons (UI)

- 20–28px, 1.6–1.8px stroked, rounded caps and joins. See §7 Components → Icons.

### Image scaling on mobile

- All photo containers are aspect-ratio-locked, so images crop to fill. No image overflows its container.
- Image slots use `width: 100%; height: 100%; object-fit: cover` (and the `<image-slot>` web component handles this automatically).
- For Astro, use `<Image>` from `astro:assets` with a 2× density `densities={[1, 2]}` for retina.

### Photos to source for full build

Suggested shot list to commission or stage on tour day:
1. Hero — a child in warm light, mid-play (4:5)
2. Day-visual — lunch table, family-style meal (4:5)
3. Space tiles — the main room, garden, cozy nook, art corner, lunch table

---

## 10. Tone & Voice

### Voice attributes

- **Warm.** Talks *to* parents, not *at* them. Reads like a note from a friend who happens to run a daycare.
- **Specific over generic.** "Cozy cots, soft music" beats "comfortable sleep environment."
- **Confident without being clinical.** "We're licensed. Here's what we do." No insurance-policy language.
- **Quietly playful.** A wink, not a wink-wink. "Pass the bread, please" is the maximum cuteness.

### Language patterns

- **Em-dash for warmth and rhythm.** "A warm, play-based daycare in the heart of Langley — we're here when you need us."
- **One italic word per display headline** (the soul of the brand visually + verbally).
- **Use contractions.** "We're" not "we are." "Don't" not "do not."
- **Lowercase eyebrows are typeset UPPERCASE.** Eyebrow copy stays short — 1 to 3 words.
- **Numerals over words for time and ages.** "Ages 0–5", "7am–6pm", "1:3 ratio."
- **Avoid jargon.** No "ECE-certified educators" — say "caring educators." No "developmentally appropriate practice" — say "we follow their lead."
- **Light British/Canadian spelling.** "neighbourhood", "colour" — this is Langley, BC.

### Words to use

family-run · cuddles · curiosity · puddles · rhythm · garden · cozy · warm · hands-on · play-based · the kiddos · hot lunch · forest school · little ones

### Words / phrases to avoid

excellence · best-in-class · cutting-edge · enrichment · childcare solutions · early learning facility · stakeholders · maximize · optimal · curriculum-driven (we do *have* a curriculum, we just don't say it that way)

### Page-level voice

- **Hero**: 1 emotive headline + 1-sentence promise + 2 CTAs. Get them to feel something, then offer a next step.
- **Programs**: 1-sentence emotional positioning ("Slow days, lots of cuddles, sleep when you sleep.") + bullet practicalities.
- **Approach**: 3 short pillars, each with a verbed headline + 1-2 sentence amplification.
- **Day**: time markers + warm verbs ("Soft hellos", "Goodbye hugs").
- **CTAs across the site**: "Book a tour", "Join the waitlist", "Ask us a question." Always action-led. Never "Submit" or "Send."

---

## Appendix — File map

| File | Role |
|---|---|
| `tokens.css` | All design tokens as CSS custom properties (drop into root stylesheet). |
| `design-system.md` | This document. |
| `src/styles.css` | Compiled homepage styles, references the tokens. |
| `index.html` | Reference homepage implementation. |
| `preview-mobile.html` | Mobile-frame preview of the homepage. |

For the Astro + Tailwind rebuild, see `tokens.css` for `@theme` directives compatible with Tailwind v4 (or `theme.extend` for v3).
