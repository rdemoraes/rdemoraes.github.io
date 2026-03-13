# raphaelmoraes.dev — Full Rebuild Specification

Use this document as a complete prompt to recreate the web app from zero.

---

## 1. Project Identity

- **Domain**: raphaelmoraes.dev
- **Owner**: Raphael Moraes — Agentic Platform Engineer · AI Systems
- **Purpose**: Personal website — hero, writing, certifications, education, tools canvas
- **Repository**: GitHub Pages static site (`rdemoraes/rdemoraes.github.io`)

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, Pages Router |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | CSS Modules + inline styles with design tokens |
| Deployment | GitHub Actions → GitHub Pages |
| Node tooling | npm (use `npm ci` — never npx next build, always `./node_modules/.bin/next build`) |

**`next.config.ts` required settings:**
```ts
output: "export"
trailingSlash: true
images: { unoptimized: true }
```

**Critical public files (never delete):**
- `public/.nojekyll` — GitHub Pages must serve `_next/` assets
- `public/CNAME` — content: `raphaelmoraes.dev`

**CI/CD:** single workflow file `.github/workflows/deploy.yml` triggered on `push: main`.
Do NOT add other workflow files that also trigger on push to main (causes double builds and deployment races).

---

## 3. File Structure

```
components/
  NavBar.tsx              ← sticky responsive nav, hamburger on mobile
pages/
  _app.tsx                ← imports styles/globals.css
  index.tsx               ← home page
  canvas.tsx              ← GenAI Technology Stack Canvas
public/
  .nojekyll
  CNAME
styles/
  globals.css             ← global reset ONLY (box-sizing + body margin)
  tokens.ts               ← design tokens (single source of truth)
  navbar.module.css       ← NavBar responsive CSS
  canvas.module.css       ← canvas page responsive grid CSS
CLAUDE.md                 ← Claude Code project rules
SPEC.md                   ← this file
next.config.ts
tsconfig.json
package.json
```

---

## 4. Design System

### 4.1 Design Token File — `styles/tokens.ts`

All visual constants live here. Never hardcode colors, font sizes, spacing, or radius values in components.

```ts
export const colors = {
  bgPage:        "#0f172a",   // all page backgrounds — no exceptions
  bgSurface:     "#1e293b",   // cards, panels
  bgSubtle:      "rgba(255,255,255,0.03)",
  borderDefault: "#1e3a5f",
  borderSubtle:  "rgba(255,255,255,0.07)",
  borderFaint:   "rgba(255,255,255,0.04)",
  indigo:        "#818cf8",   // brand, links, primary accent
  indigoDim:     "#4f46e5",   // hover borders
  cyan:          "#22d3ee",   // tech tags
  violet:        "#a78bfa",
  amber:         "#fbbf24",
  teal:          "#2dd4bf",
  pink:          "#f472b6",
  textPrimary:   "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted:     "#64748b",
  textDim:       "#475569",
};

export const typography = {
  fontSans: "Inter, system-ui, sans-serif",
  fontMono: "monospace",
  scale: { label:10, caption:12, body:14, ui:16, lead:20, h3:24, h2:32, h1:40 },
  weight: { regular:400, medium:600, bold:700, black:800, heavy:900 },
  lineHeight: { tight:1.15, base:1.4, relaxed:1.6, loose:1.7 },
  letterSpacing: { normal:0, wide:0.5, wider:1, widest:2, uppercase:3 },
};

export const space = { 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 12:48, 14:56, 16:64 };

export const radius = { xs:4, sm:8, md:12, full:9999 };

export const shadow = {
  none: "none",
  glow:   (color: string) => `0 0 12px ${color}33`,
  glowSm: (color: string) => `0 0 8px ${color}22`,
};

export const layout = {
  navHeight:            56,
  maxWidth:             800,   // standard pages
  maxWidthWide:         1200,  // canvas / diagram pages
  contentPaddingTop:    60,    // IDENTICAL on every page — non-negotiable
  contentPaddingX:      24,    // standard pages
  contentPaddingXWide:  18,    // canvas page
  contentPaddingBottom: 60,
};
```

### 4.2 Color Rules

- `colors.bgPage` (`#0f172a`) is the root background on **all pages** — no exceptions.
- Hover on cards: change `borderColor` to `colors.indigoDim`. Use `onMouseEnter/Leave`.
- Do not introduce ad-hoc colors for page roots.

### 4.3 Typography Rules

- Font: always `typography.fontSans` for UI, `typography.fontMono` for code/tags.
- Only use sizes from `typography.scale`. No intermediate ad-hoc values.

### 4.4 Spacing

- 4-point grid via `space.*`. No values outside the scale.

### 4.5 Border Radius

- `radius.xs` (4) — badges, tags
- `radius.sm` (8) — inner cards
- `radius.md` (12) — main cards and containers
- `radius.full` (9999) — pills

### 4.6 Shadows

- Use `shadow.glow(color)` / `shadow.glowSm(color)` for accent glow. No inline `box-shadow` strings.

### 4.7 Color System Rationale

The palette is built on **two Tailwind CSS ramps** — slate and indigo — so any combination is harmonious by construction.

**Background scale (slate ramp):**
- `bgPage` `#0f172a` = Tailwind slate-900 — the darkest usable dark background; "cold tech" blue-grey, not neutral black
- `bgSurface` `#1e293b` = Tailwind slate-800 — one step lighter, enough contrast for card elevation without brightness shock
- Two-step elevation (page → surface) is sufficient; a third level would collapse visual hierarchy

**Borders:**
- `borderDefault` `#1e3a5f` — not a slate step but a blue-navy tint; it echoes the indigo accent and makes borders feel like part of the same palette rather than grey dividers

**Primary accent (indigo ramp):**
- `indigo` `#818cf8` = Tailwind indigo-400 — reads as "engineering / AI" (not consumer-app blue, not startup purple); sits between blue and violet for a distinct identity
- WCAG AA compliant on `#0f172a` at its natural weight
- Single-hue anchor: all interactive states derive from this one ramp
- `indigoDim` `#4f46e5` = Tailwind indigo-600 — used exclusively for hover borders; same hue, two steps darker = "pressing in" without a hue shift

**Text hierarchy (four slate levels):**
- `textPrimary` `#f1f5f9` (slate-100) — headings, card titles; near-white without pure white glare
- `textSecondary` `#94a3b8` (slate-400) — body, descriptions; comfortable reading weight
- `textMuted` `#64748b` (slate-500) — labels, section headers, footer; clearly de-emphasised
- `textDim` `#475569` (slate-600) — divider labels, ultra-low-priority text

**Signal color — cyan:**
- `cyan` `#22d3ee` = Tailwind cyan-400 — isolated to tech tags only
- Cyan is the terminal/syntax-highlight convention (think monospace code, CLI output); using it only on tech tags makes those elements read as "technical signal" without needing explanation
- Kept out of headings, borders, and interactive states to preserve its signal value

**Underlying principle:** slate provides all backgrounds and text; indigo provides all interactive/brand states; cyan provides one narrow semantic signal. Two ramps = unlimited harmonic combinations.

---

## 5. Layout & Page Shell

**Every page follows this structure:**

```tsx
<div style={{ background: colors.bgPage, minHeight: "100vh", fontFamily: typography.fontSans }}>
  <NavBar />                          {/* sticky — MUST be first child, outside any padding */}
  <main style={{ maxWidth: layout.maxWidth, margin: "0 auto",
                 padding: `${layout.contentPaddingTop}px ${layout.contentPaddingX}px` }}>
    {/* page content */}
  </main>
  <footer>{/* optional */}</footer>
</div>
```

**Canvas (wide) variant:**
```tsx
<div style={{ background: colors.bgPage, minHeight: "100vh", fontFamily: typography.fontSans }}>
  <NavBar />
  <div style={{ padding: `${layout.contentPaddingTop}px ${layout.contentPaddingXWide}px ${layout.contentPaddingBottom}px` }}>
    {/* page content */}
  </div>
</div>
```

**NavBar must never be inside a padding wrapper.** The sticky positioning breaks if it is.

---

## 6. Component: NavBar (`components/NavBar.tsx`)

- Sticky (`position: sticky; top: 0; z-index: 100`)
- Background: `#0f172a`, bottom border: `1px solid #1e3a5f`
- Inner nav constrained to `maxWidth: 800`, centered, `height: 56px`, `padding: 0 24px`
- Left: brand wordmark "raphaelmoraes.dev" in `#818cf8`, `fontWeight: 800`, `fontSize: 15`; links to `/`
- Right (desktop ≥ 641px): inline links, `gap: 24px`, `fontSize: 13`
- Right (mobile ≤ 640px): hamburger button (`☰` / `✕`), toggles a full-width dropdown

**Nav links:**
```ts
{ label: "GenAI Canvas", href: "/canvas", external: false }
{ label: "GitHub",       href: "https://github.com/rdemoraes", external: true }
{ label: "LinkedIn",     href: "https://www.linkedin.com/in/raphael-francisco-de-moraes-9206a048/", external: true }
```

**Active link** (current page): `fontWeight: 600`, `color: #f1f5f9`. Default: `fontWeight: 400`, `color: #94a3b8`.

**Mobile menu:** dropdown below the nav bar, links stacked vertically, `fontSize: 15`, `padding: 10px 0`, each separated by `1px solid #1e3a5f` bottom border. Clicking any link closes the menu.

**`styles/navbar.module.css`:**
```css
.desktopLinks { display: flex; align-items: center; gap: 24px; }
.hamburger { display: none; background: none; border: none; cursor: pointer;
             padding: 8px; color: #94a3b8; font-size: 22px; line-height: 1; border-radius: 6px; }
.hamburger:focus-visible { outline: 2px solid #818cf8; outline-offset: 2px; }
.mobileMenu { border-top: 1px solid #1e3a5f; padding: 8px 24px 16px;
              display: flex; flex-direction: column; gap: 2px; }
@media (max-width: 640px) {
  .desktopLinks { display: none; }
  .hamburger { display: block; }
}
```

---

## 7. Page: Home (`pages/index.tsx`)

**`<Head>`:** title `"Raphael Moraes — Platform Engineering & AI Systems"`, viewport meta, favicon.

**Page shell:** standard template (maxWidth 800, padding 60px 24px).

**Section order:**

### 7.1 Hero
- Label: `"Agentic Platform Engineer · AI Systems"` — `fontSize: 11`, `fontWeight: 700`, `color: #818cf8`, `letterSpacing: 3`, uppercase, `marginBottom: 16`
- H1: `"Raphael Moraes"` — `fontSize: 40`, `fontWeight: 900`, `color: #f1f5f9`, `margin: 0 0 16px`, `lineHeight: 1.15`
- Body: `"I build Agentic Platform Engineering tooling - MCP servers, AI agents, agentic workflows, and the security and observability standards that make them production-grade."` — `fontSize: 16`, `color: #94a3b8`, `lineHeight: 1.7`, `maxWidth: 560`, `margin: 0 0 28px`
- Tech tags (cyan `#22d3ee`): `Python`, `FastMCP`, `PyTest`, `LangGraph`, `LiteLLM`, `Openroute`, `n8n`, `OpenTelemetry`, `Arize Phoenix`, `Postgres`, `PgVector`, `GitLab CI`, `GitHub Actions`, `Prefect`, `Databricks`, `Docker`, `Docker Compose`, `DevContainers`, `Kubernetes`, `AWS`, `GCP`, `Terraform`, `Crossplane`

**Tag component** (local): `display: inline-block`, `background: ${color}22`, `border: 1px solid ${color}44`, `borderRadius: 4`, `fontSize: 11`, `padding: 2px 8px`, `fontFamily: monospace`, `fontWeight: 700`

### 7.2 Writing (section heading style used for all sections below)
Section heading style: `fontSize: 13`, `fontWeight: 700`, `color: #64748b`, `letterSpacing: 2`, uppercase, `margin: 0 0 20px`.

**Posts array:**
```ts
{
  href: "https://www.linkedin.com/pulse/write-tool-trap-how-indirect-prompt-injection-turns-your-de-moraes-o22wf/",
  external: true,
  date: "Mar 9, 2026",
  tag: "Security",
  tagColor: "#f472b6",
  title: "The Write Tool Trap: How Indirect Prompt Injection Turns Your MCP Server Against You",
  description: "I found 14 write tools in my own MCP server with zero confirmation gate. Here's the full attack path and the three fixes — confirmed gates, content enveloping, and bounded list calls.",
}
```

**PostCard:** `background: #1e293b`, `border: 1px solid #1e3a5f`, `borderRadius: 12`, `padding: 20px 24px`. Hover: `borderColor → #4f46e5`. External links: `target="_blank" rel="noreferrer"`.

### 7.3 Certifications

```ts
[
  { title: "Certified Kubernetes Administrator",    abbr: "CKA", issuer: "CNCF / Linux Foundation",  color: "#326ce5" },
  { title: "AWS Developer Associate",               abbr: "DVA", issuer: "Amazon Web Services",       color: "#f59e0b" },
  { title: "AWS Solutions Architect Associate",     abbr: "SAA", issuer: "Amazon Web Services",       color: "#f59e0b" },
  { title: "Associate Cloud Engineer",              abbr: "ACE", issuer: "Google Cloud",              color: "#34a853" },
  { title: "GitLab Certified Associate",            abbr: "GL",  issuer: "GitLab",                   color: "#fc6d26" },
]
```

**CertCard:** flex row, `gap: 16`. Badge: 44×44px, `borderRadius: 10`, `background: ${color}18`, `border: 1.5px solid ${color}55`, centered abbr text in monospace `fontSize: 11 fontWeight: 800`. Text: title `fontSize: 14 fontWeight: 700 color: #f1f5f9`, issuer `fontSize: 12 color: #64748b`.

### 7.4 Education (most recent first)

```ts
[
  { school: "Faculdade de Tecnologia Rocketseat",                          degree: "Postgraduate Degree in Artificial Intelligence & Automation",                               period: "Feb 2026 – Mar 2027", color: "#818cf8" },
  { school: "Pontifícia Universidade Católica do Rio Grande do Sul",       degree: "Postgraduate Degree in Full Stack Development, Computer Software Engineering",              period: "Jan 2025 – Feb 2026", color: "#38bdf8" },
  { school: "Uninove – Universidade Nove de Julho",                        degree: "Technology Degree in Database, Information Technology",                                    period: "Aug 2010 – Apr 2013", color: "#94a3b8" },
]
```

**EducationCard:** flex row `alignItems: flex-start`, `gap: 16`. Left: 10×10px colored dot (`borderRadius: 50%`, `marginTop: 5`, `flexShrink: 0`). Right: school name `fontSize: 14 fontWeight: 700 color: #f1f5f9`, degree `fontSize: 13 color: #94a3b8 lineHeight: 1.5`, period `fontSize: 12 color: #64748b`.

### 7.5 Tools (canvas link card)
Section heading: "Tools". Single `<Link href="/canvas">` card: `background: #4f46e518`, `border: 1px solid #4f46e555`, `borderRadius: 12`, `padding: 20px 24px`. Title: "GenAI Local Setup Canvas" `fontSize: 15 fontWeight: 700 color: #f1f5f9`. Description: "A visual reference for building a high-standards AI-native engineering environment — client layer, MCP servers, LiteLLM gateway, observability stack, and security standards in one view." `fontSize: 13 color: #94a3b8 lineHeight: 1.6`.

### 7.6 Footer
`borderTop: 1px solid #1e3a5f`, `padding: 24px`, centered, `fontSize: 12`, `color: #64748b`.
Content: `raphaelmoraes.dev · RFCA Solutions · {new Date().getFullYear()}`

---

## 8. Page: Canvas (`pages/canvas.tsx`)

**Purpose:** GenAI Technology Stack Canvas — a dense visual reference for an AI-native engineering stack.

**`<Head>`:** `<meta name="viewport" content="width=device-width, initial-scale=1" />`, title `"GenAI Technology Stack Canvas — raphaelmoraes.dev"`.

**Shell:** wide template — `padding: 60px 18px 22px` (NavBar outside wrapper, no maxWidth constraint).

**`styles/canvas.module.css`** — responsive grid classes:
```css
.grid4  { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; }
.grid3  { display: grid; grid-template-columns: 1fr 1fr 1fr; }
.grid5  { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
.grid2  { display: grid; grid-template-columns: 1fr 1fr; }
.gridTools { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
.gridTools > * { min-width: 0; }  /* prevents nowrap overflow */

@media (max-width: 1024px) {
  .grid5     { grid-template-columns: 1fr 1fr 1fr; }
  .gridTools { grid-template-columns: 1fr 1fr 1fr 1fr; }
}
@media (max-width: 768px) {
  .grid4     { grid-template-columns: 1fr 1fr; }
  .grid3     { grid-template-columns: 1fr 1fr; }
  .grid5     { grid-template-columns: 1fr 1fr; }
  .grid2     { grid-template-columns: 1fr; }
  .gridTools { grid-template-columns: 1fr 1fr 1fr; }
}
@media (max-width: 480px) {
  .grid4     { grid-template-columns: 1fr; }
  .grid3     { grid-template-columns: 1fr; }
  .grid5     { grid-template-columns: 1fr; }
  .grid2     { grid-template-columns: 1fr; }
  .gridTools { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 360px) {
  .gridTools { grid-template-columns: 1fr; }
}
```

### 8.1 Canvas Color Palette

```ts
const PALETTE = {
  bg:    "#0f172a",
  col1:  { fill: "#4f46e5", badge: "#818cf8" },   // Client Layer
  col2:  { fill: "#0891b2", badge: "#22d3ee" },   // IDE
  col3:  { fill: "#7c3aed", badge: "#a78bfa" },   // Config
  col5a: { fill: "#0369a1", badge: "#38bdf8" },   // MCP Servers
  col5b: { fill: "#be185d", badge: "#f472b6" },   // Agents
  gw:    { fill: "#b45309", badge: "#fcd34d" },   // AI Gateway
  std:   { fill: "#d97706", badge: "#fbbf24" },   // Standards
  obs:   { fill: "#0f766e", badge: "#2dd4bf" },   // Observability
};
```

### 8.2 Dependency Badge Styles

```ts
const DEP_STYLES = {
  Rules:       { bg: "#dc262618", border: "#dc262666", color: "#fca5a5", label: "Depends on: Claude Rules" },
  Skills:      { bg: "#16a34a18", border: "#16a34a66", color: "#86efac", label: "Depends on: Claude Skills" },
  Local:       { bg: "#71717a18", border: "#71717a66", color: "#d4d4d8", label: "Depends on: Local Setup" },
  LocalRemote: { bg: "#92400e18", border: "#92400e66", color: "#fcd34d", label: "Depends on: Local & Remote Infrastructure" },
};
```

### 8.3 Layer Definitions

```ts
[
  { num:"1", color:"#818cf8", title:"Client Layer",              desc:"How you interact with AI — the tools, IDE, and configuration that shape every session. This is where Rules and Skills are defined and where Claude Code runs." },
  { num:"2", color:"#fbbf24", title:"Standards & Frameworks Layer", desc:"How you build everything — MCP servers, agents, security controls, and input/output contracts. Defines the engineering standards that govern every artifact you produce." },
  { num:"3", color:"#fcd34d", title:"AI Gateway Layer",          desc:"The runtime control plane — routes LLM calls, proxies MCP servers, publishes agents as endpoints, and enforces budget and rate controls. Powered by LiteLLM." },
  { num:"4", color:"#2dd4bf", title:"Observability Layer",       desc:"Full visibility across every layer — traces, logs, metrics, and LLM evaluation. Built on OpenTelemetry and Arize Phoenix. Nothing runs as a black box." },
]
```

### 8.4 Canvas Local Components

All page-specific components are defined locally in `canvas.tsx`:

- **`Tag`** — colored monospace badge chip. `background: ${color}22`, `border: 1px solid ${color}55`, `borderRadius: 4`, `fontSize: 9.5`, `padding: 1px 6px`, `fontFamily: monospace`, `fontWeight: 700`
- **`Num`** — circular numbered badge. 30×30px, `borderRadius: 50%`, `border: 2px solid ${color}`, `background: ${color}18`, `fontSize: 13 fontWeight: 800`
- **`PSBadge`** — "★ Personal Standard" pill. Gradient background `#7c3aed44 → #4f46e544`, `border: 1px solid #818cf8aa`, `color: #c4b5fd`, `fontSize: 8.5 fontWeight: 800 uppercase`
- **`DepBadge`** — dependency badge using `DEP_STYLES` lookup
- **`Divider`** — horizontal rule with centered uppercase label. `fontSize: 9.5 color: #475569 fontWeight: 700 letterSpacing: 2 uppercase`
- **`Cell`** — primary card with `Num` badge, title, subtitle, bullet list, tags, dep badges. Standard: `background: ${fill}18 border: 1.5px solid ${fill}55`. Personal Standard variant: `background: ${fill}28 border: 2px solid ${fill}99 boxShadow: 0 0 12px ${fill}33`
- **`BandCell`** — compact card variant without `Num`, used inside multi-column sections

### 8.5 Canvas Structure (top to bottom)

1. **Title block** — "DEVELOPED BY RAPHAEL MORAES" label, H1 "GenAI Technology Stack Setup Canvas", subtitle "Opinionated, layered AI-native engineering stack for Vibe Coders · v1.0", legend row (Personal Standard + 4 dep badge types)

2. **Architecture Overview** — `bgSubtle` panel, 4-column grid (`grid4`), one card per layer with num circle + title + description

3. **Client Layer** (`col1`, `col2`, `col3`)
   - Row 1: 3-column grid (`grid3`) — Cells 1 (AI Model Tool), 2 (IDE Setup), 3 (Configuration Layer)
   - Row 2: 2-column grid (`grid2`) — Cell 4 (MCP Servers, inner `grid2`: Local / Remote) + Cell 5 (Agents, inner `grid2`: Local / Remote)

4. **Standards & Frameworks Layer** (`std`)
   - Row 1: 5-column grid (`grid5`) — Cells 6–10
   - Row 2: 2-column grid (`grid2`) — Cells 11 (Inputs) + 12 (Outputs)

5. **AI Gateway Layer** (`gw`) — single full-width panel with `grid5` inside (Cells 13a–e)

6. **Observability Layer** (`obs`) — single full-width panel with `grid4` inside (Cell 14a–d)

7. **Tools Reference** — `bgSubtle` panel, `gridTools` responsive grid, 28 tool cards. Each card: category label (9px uppercase), tool name (11.5px bold `#c4b5fd`), URL (9.5px monospace truncated). Hover: `background → rgba(255,255,255,0.08)`. All links `target="_blank" rel="noopener noreferrer"`.

8. **Footer** — centered, `fontSize: 10`, `color: #334155`, text: `raphaelmoraes.dev · GenAI Engineering Standard v1.0 · 2026`

### 8.6 Tools Reference Data (28 items)

```ts
{ category: "AI Model",            name: "Claude Code",             url: "https://claude.ai/code" }
{ category: "AI Model",            name: "Claude Desktop",          url: "https://claude.ai/download" }
{ category: "IDE",                 name: "VSCode",                  url: "https://code.visualstudio.com" }
{ category: "Configuration",       name: "CLAUDE.md Reference",     url: "https://docs.anthropic.com/en/docs/claude-code/memory" }
{ category: "MCP Framework",       name: "FastMCP",                 url: "https://github.com/jlowin/fastmcp" }
{ category: "Package Mgmt",        name: "Poetry",                  url: "https://python-poetry.org" }
{ category: "Testing",             name: "Pytest",                  url: "https://docs.pytest.org" }
{ category: "Linting",             name: "Megalinter",              url: "https://megalinter.io" }
{ category: "Security Scan",       name: "Trivy",                   url: "https://trivy.dev" }
{ category: "Security",            name: "OWASP MCP Top 10",        url: "https://owasp.org/www-project-mcp-top-10" }
{ category: "Secrets",             name: "1Password Connect",       url: "https://developer.1password.com/docs/connect" }
{ category: "Orchestration",       name: "LangGraph",               url: "https://github.com/langchain-ai/langgraph" }
{ category: "Agent Framework",     name: "CrewAI",                  url: "https://crewai.com" }
{ category: "Database",            name: "PostgreSQL + pgvector",   url: "https://github.com/pgvector/pgvector" }
{ category: "Containers",          name: "Chainguard Images",       url: "https://chainguard.dev" }
{ category: "Containers",          name: "Docker Hardened Images",  url: "https://hub.docker.com/search?q=&type=image&image_filter=official" }
{ category: "AI Gateway",          name: "LiteLLM",                 url: "https://litellm.ai" }
{ category: "Observability",       name: "Arize Phoenix",           url: "https://phoenix.arize.com" }
{ category: "Observability",       name: "OpenTelemetry",           url: "https://opentelemetry.io" }
{ category: "Agent — Investigator",name: "HolmesGPT",              url: "https://holmesgpt.dev" }
{ category: "Agent — Coder",       name: "Claude Code CLI",         url: "https://docs.anthropic.com/en/docs/claude-code" }
{ category: "Agent — Reviewer",    name: "PR-Agent (Qodo)",         url: "https://github.com/qodo-ai/pr-agent" }
{ category: "Agent — Security",    name: "Metis (Arm)",             url: "https://github.com/arm/metis" }
{ category: "Agent — CI Coder",    name: "GitLab Duo",              url: "https://about.gitlab.com/gitlab-duo" }
{ category: "Agent — CI Coder",    name: "GitHub Copilot",          url: "https://github.com/features/copilot" }
{ category: "MCP — Orchestration", name: "Prefect",                 url: "https://prefect.io" }
{ category: "MCP — Data",          name: "Databricks",              url: "https://databricks.com" }
{ category: "MCP — GitOps",        name: "ArgoCD MCP",              url: "https://argo-cd.readthedocs.io" }
{ category: "MCP — Infra",         name: "Kubernetes EKS/GKE",      url: "https://kubernetes.io" }
```

---

## 9. Interaction Patterns

- **Hover on cards**: `onMouseEnter` → `e.currentTarget.style.borderColor = "#4f46e5"`, `onMouseLeave` → restore original border color
- **Transitions**: `transition: "all 0.15s"` on all interactive cards
- **External links**: always `target="_blank" rel="noreferrer"`
- **Internal links**: always use Next.js `<Link>`

---

## 10. Accessibility

- Every page: `<meta name="viewport" content="width=device-width, initial-scale=1" />` + unique `<title>`
- NavBar hamburger: `aria-label` (changes between "Open menu" / "Close menu") + `aria-expanded`
- `focus-visible` outline on hamburger button: `2px solid #818cf8`
- All body text meets WCAG AA contrast on `#0f172a` background

---

## 11. Global CSS (`styles/globals.css`)

```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 0; }
```

Nothing else. All page-specific styles use CSS Modules or inline styles with tokens.

---

## 12. Development Commands

```bash
npm ci                              # install exact deps
npm run dev                         # dev server at localhost:3000
./node_modules/.bin/next build      # static export to out/  ← use this, not npx
```

After build, verify:
- `out/CNAME` exists (contains `raphaelmoraes.dev`)
- `out/.nojekyll` exists
- `out/index.html` and `out/canvas/index.html` exist
