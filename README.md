# raphaelmoraes.dev

Personal website and project showcase built with Next.js and deployed to GitHub Pages.

## Tech Stack

- **Framework**: Next.js 15 (Pages Router, static export)
- **Language**: TypeScript 5
- **Styling**: CSS Modules + global CSS reset
- **Deployment**: GitHub Actions → GitHub Pages
- **Domain**: [raphaelmoraes.dev](https://raphaelmoraes.dev)

## Project Structure

```
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── pages/
│   ├── _app.tsx                   # App wrapper (global styles)
│   ├── index.tsx                  # Home page
│   └── canvas.tsx                 # GenAI Technology Stack Canvas
├── public/
│   ├── .nojekyll                  # Required for GitHub Pages (_next/ assets)
│   └── CNAME                      # Custom domain configuration
├── styles/
│   ├── globals.css                # Global reset
│   └── canvas.module.css          # Canvas page responsive grid
└── next.config.ts
```

## Local Development

```bash
npm ci           # Install dependencies
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build static export to out/
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys the `out/` directory to GitHub Pages.
