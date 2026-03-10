# raphaelmoraes.dev — Project Rules

## Stack

- **Framework**: Next.js 15, Pages Router, static export (`output: "export"`)
- **Language**: TypeScript 5 / React 19
- **Styling**: CSS Modules + global CSS reset + design tokens
- **Deployment**: GitHub Actions → GitHub Pages (custom domain: raphaelmoraes.dev)

---

## Design System

### Tokens — `styles/tokens.ts`

All visual constants (colors, typography, spacing, border-radius, shadows, layout) live in `styles/tokens.ts`.

**Rule**: Never hardcode a color, font, font-size, spacing value, or border-radius directly in a component.
Always import from `styles/tokens.ts`.

```tsx
import { colors, typography, space, radius } from "../styles/tokens";

// correct
<div style={{ background: colors.bgPage, padding: space[6] }}>

// wrong — never do this
<div style={{ background: "#0f172a", padding: 24 }}>
```

---

### Color

| Token | Value | Usage |
|---|---|---|
| `colors.bgPage` | `#0f172a` | Default page background (all standard pages) |
| `colors.bgCanvas` | `#1e1b4b` | Canvas / diagram views only |
| `colors.bgSurface` | `#1e293b` | Cards, panels, post cards |
| `colors.bgSubtle` | `rgba(255,255,255,0.03)` | Subtle section lift |
| `colors.borderDefault` | `#1e3a5f` | Cards, nav separators |
| `colors.borderSubtle` | `rgba(255,255,255,0.07)` | Faint dividers |
| `colors.indigo` | `#818cf8` | Brand wordmark, links, primary accent |
| `colors.indigoDim` | `#4f46e5` | Hover borders, dimmed accent |
| `colors.cyan` | `#22d3ee` | Tech tags on home |
| `colors.textPrimary` | `#f1f5f9` | Headings, titles |
| `colors.textSecondary` | `#94a3b8` | Body text, descriptions |
| `colors.textMuted` | `#64748b` | Labels, section headers, footer |
| `colors.textDim` | `#475569` | De-emphasised text |

**Page background rule**: All pages use `colors.bgPage` (`#0f172a`) as the root background.
The canvas page (`canvas.tsx`) is the only exception — it uses `colors.bgCanvas` (`#1e1b4b`) to create visual separation for the diagram view. Do not introduce other background values.

---

### Typography

Font family: **always** `typography.fontSans` (`Inter, system-ui, sans-serif`) for UI text, `typography.fontMono` for code/tags.

Use the type scale from `typography.scale` — never intermediate ad-hoc sizes:

| Name | px | Usage |
|---|---|---|
| `label` | 10 | Category badges, divider labels, legal text |
| `caption` | 12 | Dates, meta, secondary info |
| `body` | 14 | Standard prose, list items |
| `ui` | 16 | Card body text, form fields |
| `lead` | 20 | Section intros |
| `h3` | 24 | Sub-section headings |
| `h2` | 32 | Section headings |
| `h1` | 40 | Hero heading (one per page) |

Font weights: use `typography.weight.*` — `regular (400)`, `medium (600)`, `bold (700)`, `black (800)`, `heavy (900)`.

---

### Spacing

Use the 4-point grid from `space.*`: `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64`.
Do not use values outside this scale.

---

### Border Radius

| Token | px | Usage |
|---|---|---|
| `radius.xs` | 4 | Badges, tags, inline chips |
| `radius.sm` | 8 | Inner cards, sub-panels |
| `radius.md` | 12 | Cards, main containers |
| `radius.full` | 9999 | Pills, circular avatars |

---

### Shadows / Glow

Use `shadow.glow(color)` and `shadow.glowSm(color)` helpers for accent glow effects on highlighted cards. Do not write custom `box-shadow` strings inline.

---

## Component Architecture

### Directory structure

```
components/        ← shared, reusable UI components
  Tag.tsx          ← colored badge chip (used on both home and canvas)
  Divider.tsx      ← horizontal divider with centered label
  NavBar.tsx       ← shared top navigation bar
pages/             ← Next.js pages (one file = one route)
styles/
  globals.css      ← global reset only (box-sizing + body margin/padding)
  tokens.ts        ← design tokens (single source of truth)
  canvas.module.css ← canvas-specific responsive grid (CSS Module)
```

### Rules

- **Shared components go in `components/`**. If a component is used in more than one page, extract it.
  `Tag` and `Divider` are currently duplicated — they must live in `components/` and be imported by both pages.
- **Page-specific components** (e.g., `Cell`, `BandCell`, `Num`, `PSBadge`) can remain co-located in their page file as local component functions, provided they are not reused elsewhere.
- **No inline style objects for token values.** Prefer `style={{ color: colors.indigo }}` over `style={{ color: "#818cf8" }}`.
- **CSS Modules for layout classes** (grid, flex patterns). Avoid putting layout-only rules in inline styles when they need responsive breakpoints.
- **`globals.css` must stay clean** — only the universal box-sizing reset and `body { margin: 0; padding: 0; }`. No page-specific rules.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase | `PostCard`, `NavBar`, `Tag` |
| CSS Module classes | camelCase | `styles.grid4`, `styles.gridTools` |
| Token keys | camelCase | `colors.bgPage`, `space[6]` |
| Page files | camelCase | `canvas.tsx`, `index.tsx` |
| Style files | kebab-case | `canvas.module.css` |

---

## Interaction Patterns

- **Hover states**: change `borderColor` to `colors.indigoDim` on card hover. Use `onMouseEnter/Leave` with `e.currentTarget.style`. Do not add a full CSS class for a single hover color change.
- **Links**: external links always have `target="_blank" rel="noreferrer"`. Internal links use Next.js `<Link>`.
- **Transitions**: `transition: "all 0.15s"` on interactive cards/links — keep it subtle and uniform.

---

## Accessibility

- Every page must have a `<Head>` with `<meta name="viewport" content="width=device-width, initial-scale=1" />` and a unique `<title>`.
- Color contrast: all body text must maintain WCAG AA contrast against the page background.
- Interactive elements must have visible focus states (do not remove outline without replacing with a visible alternative).
- External links in tool cards must have descriptive text (not just "click here").

---

## Next.js / GitHub Pages Requirements

Do not remove or modify these — they are required for the deployment to work:

| File | Why |
|---|---|
| `public/.nojekyll` | GitHub Pages must serve `_next/` assets |
| `public/CNAME` | Custom domain `raphaelmoraes.dev` |
| `next.config.ts` `output: "export"` | Static export |
| `next.config.ts` `trailingSlash: true` | GitHub Pages routing |
| `next.config.ts` `images: { unoptimized: true }` | No image optimizer in static export |
| `.github/workflows/deploy.yml` | CI/CD — do not add other workflow files that trigger on `push: main` |

---

## Development Commands

```bash
npm ci              # install exact deps from lockfile
npm run dev         # dev server at http://localhost:3000
npm run build       # static export to out/  (verify: out/CNAME, out/.nojekyll exist)
./node_modules/.bin/next build  # use this instead of npx next build (avoids wrong version)
```
