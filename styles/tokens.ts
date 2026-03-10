/**
 * Design Tokens — raphaelmoraes.dev
 *
 * Single source of truth for all visual constants.
 * Import from here — never hardcode colors, fonts, spacing, or radius values in components.
 */

// ---------------------------------------------------------------------------
// COLOR
// ---------------------------------------------------------------------------

export const colors = {
  // -- Backgrounds
  bgPage:    "#0f172a",  // Slate 900 — all page backgrounds (single standard)
  bgSurface: "#1e293b",  // Slate 800 — cards, panels
  bgSubtle:  "rgba(255,255,255,0.03)",  // near-invisible surface lift

  // -- Borders
  borderDefault: "#1e3a5f",             // blue-navy — cards, nav
  borderSubtle:  "rgba(255,255,255,0.07)",
  borderFaint:   "rgba(255,255,255,0.04)",

  // -- Brand accent (primary)
  indigo:    "#818cf8",  // Indigo 400 — links, brand wordmark, active states
  indigoDim: "#4f46e5",  // Indigo 600 — hover borders, dimmed accent

  // -- Secondary accents (use sparingly, per semantic layer)
  cyan:    "#22d3ee",  // Cyan 400    — tech tags on home
  violet:  "#a78bfa",  // Violet 400
  amber:   "#fbbf24",  // Amber 400
  teal:    "#2dd4bf",  // Teal 400
  pink:    "#f472b6",  // Pink 400

  // -- Text
  textPrimary:   "#f1f5f9",  // Slate 100 — headings, card titles
  textSecondary: "#94a3b8",  // Slate 400 — body, descriptions
  textMuted:     "#64748b",  // Slate 500 — labels, section headers, footer
  textDim:       "#475569",  // Slate 600 — de-emphasised text, divider labels
} as const;

// ---------------------------------------------------------------------------
// TYPOGRAPHY
// ---------------------------------------------------------------------------

export const typography = {
  fontSans: "Inter, system-ui, sans-serif",
  fontMono: "monospace",

  /**
   * Type scale — use these pixel values for fontSize.
   * Prefer the semantic names; avoid ad-hoc intermediate sizes.
   *
   * label  10  → category labels, dividers, legal
   * caption 12  → dates, meta, secondary badges
   * body   14  → standard prose, list items
   * ui     16  → card body, form fields
   * lead   20  → section intros
   * h3     24  → sub-headings
   * h2     32  → section headings
   * h1     40  → hero heading
   */
  scale: {
    label:   10,
    caption: 12,
    body:    14,
    ui:      16,
    lead:    20,
    h3:      24,
    h2:      32,
    h1:      40,
  },

  weight: {
    regular: 400,
    medium:  600,
    bold:    700,
    black:   800,
    heavy:   900,
  },

  lineHeight: {
    tight:   1.15,
    base:    1.4,
    relaxed: 1.6,
    loose:   1.7,
  },

  letterSpacing: {
    normal:    0,
    wide:      0.5,
    wider:     1,
    widest:    2,
    uppercase: 3,  // paired with textTransform: "uppercase"
  },
} as const;

// ---------------------------------------------------------------------------
// SPACING — 4-point grid
// ---------------------------------------------------------------------------

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

// ---------------------------------------------------------------------------
// BORDER RADIUS
// ---------------------------------------------------------------------------

export const radius = {
  xs: 4,   // badges, tags, inline elements
  sm: 8,   // inner cards, sub-panels
  md: 12,  // cards, main containers
  full: 9999,  // pills, avatars
} as const;

// ---------------------------------------------------------------------------
// SHADOWS
// ---------------------------------------------------------------------------

export const shadow = {
  none: "none",
  glow: (color: string) => `0 0 12px ${color}33`,
  glowSm: (color: string) => `0 0 8px ${color}22`,
} as const;

// ---------------------------------------------------------------------------
// LAYOUT
// ---------------------------------------------------------------------------

export const layout = {
  // -- Nav
  navHeight: 56,         // height of the sticky NavBar

  // -- Content max-widths
  maxWidth: 800,         // standard pages (home, blog, article)
  maxWidthWide: 1200,   // wide/diagram views (canvas, dashboards)

  // -- Page content wrapper padding
  // Apply as: padding: `${layout.contentPaddingTop}px ${layout.contentPaddingX}px`
  // This is the standard gap between the sticky NavBar and the first piece of content.
  contentPaddingTop: 60,   // vertical spacing below NavBar — consistent across all pages
  contentPaddingX:   24,   // horizontal padding for standard pages
  contentPaddingXWide: 18, // horizontal padding for wide/diagram pages (canvas)
  contentPaddingBottom: 60, // vertical spacing before footer
} as const;
