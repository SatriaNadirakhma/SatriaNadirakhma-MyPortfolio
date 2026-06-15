# Design System — Nadirakhma Portfolio

A living reference for the visual language, component behavior, and structural decisions behind this portfolio. Written to be readable by both humans and AI agents.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | CSS keyframes + inline transitions |
| Icons | Lucide React, React Icons |
| Scroll | react-scroll |
| Fonts | Google Fonts (Inter, Instrument Serif) |

---

## Color Palette

All colors are defined as CSS custom properties and consumed via Tailwind's `var()` bridge. Never hardcode raw hex values inside components — always reference a token.

### Light Mode (`:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#fafafa` | Page background |
| `--color-surface` | `#ffffff` | Card backgrounds |
| `--color-text-primary` | `#111827` | Headings, strong emphasis |
| `--color-text-secondary` | `#4b5563` | Body text, descriptions |
| `--color-text-muted` | `#9ca3af` | Labels, metadata, timestamps |
| `--color-text-subtle` | `#d1d5db` | Dividers, tertiary text |
| `--color-border` | `#e5e7eb` | Card borders, dividers |
| `--color-border-subtle` | `#f3f4f6` | Hairline borders, section separators |
| `--color-stroke` | `rgba(17, 24, 39, 0.65)` | Outline text strokes |

### Dark Mode (`.dark`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#080808` | Page background — near-black, not pure black |
| `--color-surface` | `rgba(255, 255, 255, 0.02)` | Card backgrounds |
| `--color-text-primary` | `#ffffff` | Headings |
| `--color-text-secondary` | `rgba(255, 255, 255, 0.4)` | Body text |
| `--color-text-muted` | `rgba(255, 255, 255, 0.3)` | Labels |
| `--color-text-subtle` | `rgba(255, 255, 255, 0.2)` | Dividers |
| `--color-border` | `rgba(255, 255, 255, 0.07)` | Card borders |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.05)` | Hairline borders |
| `--color-stroke` | `rgba(255, 255, 255, 0.65)` | Outline text strokes |

> **Why near-black instead of `#000000`?** Pure black creates harsh contrast that feels flat on OLED screens. `#080808` retains depth while being softer to read.

### Accent Colors

Accents are contextual — each section/card type has its own color to signal category, not just aesthetics.

| Color | Token / Class | Context | Light | Dark |
|-------|--------------|---------|-------|------|
| Blue | primary accent | Links, interactive states | `rgba(59,130,246,*)` | `rgba(147,197,253,*)` |
| Blue (pressed) | — | Active / hover emphasis | `rgba(37,99,235,*)` | `rgba(59,130,246,*)` |
| Orange | `text-orange-400` | Champions section, award cards | `border-orange-500/30` | Same |
| Emerald | `border-emerald-500/30` | Experience cards | `bg-emerald-500/5` | Same |
| WhatsApp | `#25D366` | Contact link | Static | Static |

---

## Theme System

- **Default**: reads `prefers-color-scheme` from device on first visit
- **Toggle**: Sun/Moon icon in nav — persists choice to `localStorage` under key `"portfolio-theme"`
- **Stored values**: `"light"` | `"dark"` | `"system"` (default when no preference set)
- **Flash prevention**: a blocking inline `<script>` in `index.html` applies `.dark` to `<html>` before React hydrates — eliminates FOUC entirely
- **Implementation**: class-based dark mode via `@custom-variant dark (&:where(.dark, .dark *))` in Tailwind v4

---

## Typography

Two fonts. No more, no less.

| Font | Variable | Weight | Role |
|------|----------|--------|------|
| Inter | `--font-modern` | 100–900 | Everything UI: nav, body, labels, stats, badges |
| Instrument Serif | `--font-stylish` | 400 italic | Hero name and select decorative moments |

Instrument Serif is used sparingly — only where a human, editorial touch is intentional. If in doubt, use Inter.

### Type Scale

| Element | Size | Tracking | Weight | Transform |
|---------|------|----------|--------|-----------|
| Hero headline | `clamp(52px, 8.5vw, 128px)` | normal | 700 | none |
| Section headlines | `clamp(36px, 5–6vw, 80–96px)` | normal | 700 | mixed |
| Connect headline | `clamp(48px, 9vw, 144px)` | normal | 700 | mixed |
| Stats values | `30–36px` | normal | 700 | none |
| Body text | `14–16px` | normal | 400 | none |
| Nav links | `11px` | `0.2em` | 400 | UPPERCASE |
| Nav (mobile) | `18px` | `0.3em` | 400 | UPPERCASE |
| Section labels | `10–12px` | `0.3em` | 400 | UPPERCASE |
| Eyebrow | `10–11px` | `0.28em` | 400 | UPPERCASE |
| Stats labels | `10px` | `0.2em` | 400 | UPPERCASE |
| Marquee items | `10–14px` | `0.3em` | 500 | UPPERCASE |
| Badge / CTA text | `10–12px` | `0.12–0.2em` | 400 | UPPERCASE |

All major headlines use `clamp()` so they scale fluidly between viewport widths — no font-size overrides at breakpoints needed.

---

## Spacing

Base unit is `4px`. All spacing values are multiples of it.

| Token | Value | Usage |
|-------|-------|-------|
| `px-5 sm:px-8` | 20px → 32px | Horizontal page padding |
| `py-20 sm:py-28` | 80px → 112px | Standard section vertical padding |
| `py-20 sm:py-28 md:py-36` | 80px → 144px | About section (more breathing room) |
| `gap-10 sm:gap-16 lg:gap-20` | 40px → 64px → 80px | Column gap between section grid |
| `gap-3 sm:gap-4` | 12px → 16px | Card grid gap |
| `gap-6` | 24px | Desktop nav item gap |

---

## Border Radius

| Scale | Value | Usage |
|-------|-------|-------|
| `rounded-full` | 9999px | Skill pills, avatar, small badges |
| `rounded-2xl` | 16px | Cards (Experience, Projects, Champions) |
| `rounded-xl` | 12px | Modals, popovers |
| `rounded-lg` | 8px | Filter buttons |
| `rounded-md` | 6px | Small chips, inline tags |

---

## Elevation & Shadow

This portfolio uses border + background opacity instead of heavy drop shadows. Shadows are reserved for floating elements.

| Level | Value | Usage |
|-------|-------|-------|
| Flat | none | Cards at rest — border carries the definition |
| Hover lift | `0 4px 16px rgba(0,0,0,0.06)` | Cards on hover (light mode) |
| Modal | `0 24px 64px rgba(0,0,0,0.25)` | Certificate modal overlay |
| Dark hover | `0 4px 16px rgba(0,0,0,0.4)` | Cards on hover (dark mode) |

---

## Z-Index Scale

| Layer | Value | Elements |
|-------|-------|----------|
| Base | `0` | Normal document flow |
| Raised | `10` | Inline overlapping elements |
| Sticky | `40` | Scroll-activated elements |
| Nav | `50` | Sidebar / navigation bar |
| Modal | `100` | Certificate modal |
| Loader | `999` | Loading screen overlay |

---

## Interaction States

All interactive elements (buttons, cards, pills, links) respect these state layers:

| State | Visual Treatment |
|-------|----------------|
| Default | Border only or flat bg |
| Hover | Border color lightens/darkens, subtle shadow lifts |
| Active / Selected | `bg-gray-900 text-white` (light) / `bg-white text-black` (dark) |
| Focus (keyboard) | `outline-none ring-2 ring-blue-500 ring-offset-2` — never removed, only styled |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading (async) | Spinner or `animate-pulse` skeleton on the affected area |

Focus states are never hidden. If an element is interactive, it must be keyboard-navigable with a visible ring.

---

## Animation

### Timing

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| Instant | `100ms` | `ease-out` | State flips (active/inactive toggles) |
| Fast | `150ms` | `ease-in-out` | Hover enter/exit |
| Default | `300ms` | `ease-in-out` | Most transitions — borders, opacity, color |
| Slow | `500ms` | `ease-in-out` | Fade-in on mount, photo hover |
| Loader exit | `400ms` | `ease-out` | Loading screen fade out after 2.2s hold |

### Keyframes (defined in `index.css`)

| Name | Behavior |
|------|----------|
| `fade-in` | `opacity: 0 → 1` + `translateY(10px → 0)` |
| `marquee` | `translateX(0 → -50%)` — loops seamlessly |
| `pulse-line` | Scroll indicator breathing animation |

Animations trigger once on mount via `animation-fill-mode: forwards`. They are not repeated on scroll re-entry.

---

## Layout & Grid

### Standard Section Grid

```
lg:grid-cols-[1fr_2.5fr]
```

Left column holds the section label + headline. Right column holds all content.  
On mobile/tablet: single column, stacked vertically.

### Exceptions

| Section | Grid |
|---------|------|
| Hero | `lg:grid-cols-[1fr_auto]` — text left, photo right |
| Champions / Skills | `lg:grid-cols-[1fr_2.5fr]` with `sm:grid-cols-2` on inner cards |
| Connect | Single column with `border-top` divider |

---

## Components

### Sidebar / Nav

- Fixed top, full-width, `z-50`
- Logo left, nav links + theme toggle right
- Background activates on scroll past `20px`: `white/70` + `backdrop-blur` in light / `#111111/50` + blur in dark
- Mobile: hamburger opens a full-screen overlay with theme toggle embedded

### Loading Screen

- Full-screen fixed overlay, `z-999`
- Shows name, animated progress bar, "Loading..." label
- Holds for ~2.2s, then fades out over 400ms
- Blocks interaction during mount to prevent layout flash

### Marquee

Three instances across the page, each with different content and speed:

| Instance | Content | Speed (lower = faster) |
|----------|---------|----------------------|
| Primary | Skills | 35 |
| Secondary | Project labels | 28 |
| Tech | Technologies | 20 |

Each instance has a `border-top` and `border-bottom`. Text is UPPERCASE with `0.3em` tracking.

### Cards (Experience, Projects, Champions)

```
rounded-2xl  overflow-hidden  border
bg-gray-50 dark:bg-white/[0.02]
border-gray-200 dark:border-white/[0.07]
```

**Image header**: `brightness-[0.40]–[0.75]` filter darkens the image so overlaid text stays readable.

**Hover**:
```
border-gray-300 dark:border-white/15
shadow: 0 4px 16px rgba(0,0,0,0.06)
```

**Expanded / active**: accent color border + tinted background matching the card's assigned accent (blue, emerald, or orange).

### Skill Pills

- Shape: `rounded-full` with border and `inline-flex`
- **Linked** (hard skills): hover shows external link icon, cursor pointer
- **Unlinked** (soft skills): muted text, no hover, no cursor change — intentionally passive

### Certificate Modal

- `fixed` overlay, `z-100`, `backdrop-blur`
- Certificate rendered to `<canvas>` — not as `<img>`
- Security layer: right-click disabled, drag blocked, common screenshot shortcuts intercepted
- Watermark at `5.5%` opacity with owner name, tiled across canvas

### Filter Buttons

```
Active:   bg-gray-900 text-white  /  dark: bg-white text-black
Inactive: border only, text-muted
Hover:    border-gray-300 dark:border-white/20
```

---

## Effects & Decorations

| Effect | Implementation |
|--------|---------------|
| Noise texture | SVG `feTurbulence` filter overlay, `3%` opacity — dark mode only |
| Warm glow | Two radial gradient circles, heavily blurred — top-right and bottom-left corners |
| Dot grid | `radial-gradient` at `30px` spacing — `4%` opacity dark / `6%` light |
| Radial vignette | Elliptical gradient centered on page, edges fade to `--color-bg` |
| Accent lines | Gradient `h-px` dividers at section boundaries and hero top/bottom |
| Text outline | `-webkit-text-stroke` + transparent fill on select headline words |
| Photo hover | `grayscale(100%) → grayscale(0%)` + slight `brightness` lift, `500ms ease` |
| Fade-in on mount | `opacity: 0 → 1` + `translateY(10px → 0)`, `300ms ease-out` |
| Scroll indicator | Pulsing vertical `h-px` line + "Scroll" label — hero only, hidden on mobile |

These effects are layered as `pointer-events-none` absolutely-positioned elements and never interfere with interactivity.

---

## Image Treatment

- **Hero photo**: starts at `grayscale(100%)`, transitions to `grayscale(0%)` on hover over 500ms
- **Card headers**: `object-cover` + `brightness-[0.40–0.75]` darkening filter
- **Object fit**: always `cover` — no `contain`, no letterboxing
- **Border radius**: inherits from parent card (`rounded-2xl`) via `overflow-hidden`
- Decorative images never carry alt text with meaning — use `alt=""` and `aria-hidden="true"`

---

## Accessibility

- All body text meets WCAG AA contrast (4.5:1 minimum). `#4b5563` on `#fafafa` = ~5.9:1.
- Color is never the sole indicator of state — icons or labels accompany color changes
- Focus rings are always visible for keyboard navigation (`ring-2 ring-blue-500`)
- `#080808` dark background reduces eye strain vs pure black, while maintaining WCAG compliance
- Certificate modal traps focus while open; restores focus to trigger element on close
- Marquee animation respects `prefers-reduced-motion` — pauses when set

---

## Navigation Flow

```
[[ Loading Screen ]]
    ↓
[ Hero ] → [ Marquee — Skills ]
    ↓
[ About ] → [ Experience ] → [ Marquee — Projects ]
    ↓
[ Projects ] → [ Champions ] → [ Marquee — Tech ]
    ↓
[ Skills ] → [ Connect ] → [ Footer ]
```

---

## Page Structure (`index.html`)

- Google Fonts loaded via `<link rel="preconnect">` and `<link rel="stylesheet">` in `<head>`
- Open Graph + Twitter card meta tags for social previews
- JSON-LD structured data: `Person` schema (name, URL, social profiles)
- Theme flash-prevention script runs synchronously before React mounts
- `<meta name="theme-color">` updated dynamically by `ThemeContext` on toggle

---

## File Structure (`src/`)

```
src/
├── App.jsx                    # Root layout, section composition
├── main.jsx                   # Entry point with ThemeProvider
├── index.css                  # Tailwind v4 config, CSS vars, keyframes
├── context/
│   └── ThemeContext.jsx        # Theme state, localStorage sync, system preference
├── components/
│   ├── Sidebar.jsx            # Navigation bar + theme toggle
│   ├── Marquee.jsx            # Scrolling text banner (3 variants)
│   ├── LoadingScreen.jsx      # Initial load overlay
│   └── ErrorBoundary.jsx      # React error boundary wrapper
├── sections/
│   ├── Hero.jsx               # Landing — name, role, photo, CTA
│   ├── About.jsx              # Bio, stats, brief intro
│   ├── Experience.jsx         # Work history cards (expandable)
│   ├── Projects.jsx           # Project cards with category filters
│   ├── Champions.jsx          # Awards + certificate modal
│   ├── Skills.jsx             # Skill categories with linked/unlinked pills
│   ├── Connect.jsx            # Contact section + social links
│   └── Footer.jsx             # Copyright line
├── data/
│   ├── experiences.js         # Work entries + per-card accent color
│   ├── projects.js            # Project entries + filter tags
│   ├── champions.js           # Award entries + certificate assets
│   ├── skills.js              # Skill categories + link targets
│   └── socialLinks.js         # Social media profiles
├── hooks/
│   ├── useScrollLock.js       # Locks body scroll when modal/overlay is open
│   └── useMediaQuery.js       # Reactive breakpoint detection
├── utils/
│   └── certificateSecurity.js # Canvas watermark, event blocking
└── constants/
    └── index.js               # SITE config, SECTION_IDS, MARQUEE_ITEMS, STATS
```

---

## Responsive Breakpoints

| Breakpoint | Prefix | What changes |
|------------|--------|-------------|
| Default | — | Single column, mobile padding, compact type |
| 640px | `sm:` | Wider padding, slightly larger text, 2-col card grids |
| 768px | `md:` | Desktop nav visible, hamburger hidden |
| 1024px | `lg:` | Two-column section grid activates |

No breakpoint above `1024px` — layout is intentionally unconstrained at wider viewports. Max-width container keeps content readable.

---

## Design Decisions

**Dark mode first.** The portfolio was built dark-only, then light mode was added. This means the dark palette is the primary truth; the light mode adapts from it. If something looks off in light mode, trace it back to whether the dark version was the original intent.

**`clamp()` over breakpoint overrides.** Headlines resize fluidly between viewport widths with no class variants. One property handles the full range. This reduces cognitive overhead when editing type later.

**No CSS-in-JS.** All styles live in Tailwind utility classes or inline `style` props for truly dynamic values (e.g., accent colors computed from data). There is no `styled-components`, no `emotion`. This keeps the bundle lean and the styling co-located.

**Grayscale photo treatment.** The hero photo defaulting to grayscale is intentional restraint — it lets the typography and layout breathe first, and rewards attention with color on hover. It also works in both themes without any conditional logic.

**Canvas-rendered certificates.** Certificates in the Champions section are drawn to `<canvas>` instead of rendered as `<img>` elements. This makes right-click saving, drag-and-drop theft, and common screenshot shortcuts ineffective, while still giving visitors a clear preview of the credential.

**Contextual accent colors.** Experience, Projects, and Champions each have their own accent color (emerald, blue, orange). This isn't decoration — it's orientation. A returning visitor scanning the page can locate a section by its color before reading a word.

**Noise only in dark mode.** The SVG turbulence noise layer is dark-mode-only. In light mode the off-white background already has enough natural texture; adding noise on top makes it feel busy. In dark mode the near-black `#080808` is flat without it.