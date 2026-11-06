# Development Plan — Portfolio (React + Vite)

Stack: React 19 + TypeScript + Vite, oxlint. Spec: `../IDEA.md`.
Inspiration: https://surajsavle.in/ — layout/aesthetic only; all content ours.

## Why Vite over Next
Static portfolio, no SSR/IO routes. Vite ships less, builds faster. Swap path: none needed unless SEO demands prerender → add `vite-plugin-ssg`.

## Milestones

### M0 — Baseline (done)
- [x] Scaffold `npm create vite@latest portfolio -- --template react-ts`
- [x] `npm install` (27 pkgs, 0 vulns)
- [x] Gates: `npm run lint && npm run build`

### M1 — Tokens + shell (done)
- [x] `index.css`: CSS variables from IDEA §6.1 (`--bg --fg --muted --line --accent`), both themes via `data-theme`
- [x] Blueprint grid background: fixed 1px lines, 18% line opacity over the theme background
- [x] Layout shell in production page: header, hero, about, skills, projects, experience, contact, footer (`src/App.tsx`, `src/App.css`); full copy lives in one editable file (`src/content.ts`)

### M2 — Theme system (done)
- [x] `data-theme` on `<html>`, dark/light toggle in navbar
- [x] Persist in `localStorage`; inline script in `index.html` → no flash (pre-paint theme)
- [x] `prefers-color-scheme` used on first visit; `color-scheme` follows the theme

### M3 — Sections (done)
1. Hero — name, role, pitch, CTAs, socials
2. Projects — card component: title, desc, tech tags, live/repo links, corner ticks
3. About, Skills (grouped chips), Experience (timeline)
4. Contact — mailto + social links (no backend form; IDEA §9)

### M4 — Blueprint detail pass (done)
- [x] Four-corner ticks and crosshairs on project cards (CSS pseudo-elements)
- [x] Dimension caption, section indices, coordinates — mono type
- [x] 1px borders, no shadows
- [x] Visual check: production preview at 1440px and 360px; no horizontal overflow or clipping, all sections render; no browser errors. Screenshots kept in Hermes scratch.

### M5 — Motion + a11y (done)
- [x] Hero entrance animation via CSS `@keyframes`; reduced-motion preference respected
- [x] Smooth scroll; active section highlight via IntersectionObserver, including contact at page end
- [x] Visible keyboard focus, semantic header/nav/main/footer landmarks, contrast-safe theme buttons
- [x] Production browser checks: theme toggle/storage in both themes, reduced motion, focus outline, active nav, 1440px/360px overflow, no browser errors; lint/build pass.

### M6 — SEO + content (SEO done; profile content pending)
- [x] Title, description, canonical, Open Graph/Twitter metadata, theme colors
- [x] Blueprint SVG favicon and 1200×630 PNG share image
- [x] Sitemap and robots.txt (replace `your-domain.example` before deployment)
- [ ] Real content from IDEA §7 checklist — placeholders remain until name, bio, projects, links, and work history are supplied.

### M7 — Responsive + deploy
- [ ] Mobile-first pass: 360 / 768 / 1440
- [ ] `npm run lint && npm run build`, Lighthouse pass
- [ ] Deploy (Vercel or GitHub Pages — static, both free)

## Gates (every milestone)
```
npm run lint && npm run build
```
Visual check at desktop + 360px before marking done.

## Deferred
- Framer Motion → CSS enough; add only if a specific interaction needs it.
- lucide-react → inline SVG until icon count > ~10.
- Contact form backend, analytics → after content lands (IDEA §9 open).
