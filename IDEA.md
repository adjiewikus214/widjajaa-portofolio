# Portfolio Website — Idea

## 1. Goal

Build a personal portfolio website that follows the look, structure and feel of the inspiration site, with my own content, code and assets.

- **Inspiration:** https://surajsavle.in/
- **Target fidelity:** as close to 1:1 as possible in layout, interaction and aesthetic
- **Not copied:** text, images, logos, project entries and source code (all replaced with my own)

## 2. What I could verify about the reference

The site renders client-side, so only the page head was readable. Confirmed:

| Item | Value |
|---|---|
| Title | "Suraj's Portfolio" |
| Description | "A clean, technical portfolio with theme switching and a blueprint aesthetic." |
| Theme color | `#0f172a` (slate-900, a dark navy) |
| Viewport | `width=device-width, initial-scale=1` |
| Framework hint | `next-size-adjust` meta tag suggests Next.js |

Everything below this line marks what is **confirmed** versus **assumed**.

## 3. Aesthetic direction

**Confirmed from the description:** clean, technical, blueprint aesthetic, theme switching.

**Assumed interpretation (verify against screenshots):**

- Dark navy base (`#0f172a`) with a light theme alternative
- Faint grid or graph-paper background
- Thin 1px line borders instead of heavy shadows
- Monospace type for labels, metadata and section numbers
- Corner ticks or crosshair markers on cards
- Dimension-style annotations (small captions, coordinates, index numbers)
- Restrained accent color for links and highlights

## 4. Proposed page structure (assumed, to be checked)

1. **Navbar** — logo/name, section links, theme toggle
2. **Hero** — name, role, one-line pitch, CTA buttons, social links
3. **About** — short bio, location, current focus
4. **Skills / Stack** — grouped technologies
5. **Projects** — cards with title, description, tech tags, live and repo links
6. **Experience** — timeline
7. **Contact** — email, socials, optional form
8. **Footer** — copyright, social links

## 5. Features

- [ ] Theme switching (dark / light, optionally system), persisted across visits
- [ ] No flash of wrong theme on first load
- [ ] Fully responsive (mobile first)
- [ ] Smooth scroll and active section highlighting in the navbar
- [ ] Subtle entrance animations, respecting `prefers-reduced-motion`
- [ ] SEO: title, description, Open Graph image, sitemap
- [ ] Accessibility: contrast, focus states, keyboard navigation, semantic HTML

## 6. Suggested tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS with CSS variables for theme tokens
- **Theming:** `next-themes`
- **Animation:** Framer Motion (or plain CSS transitions)
- **Icons:** lucide-react
- **Hosting:** Vercel
- **Analytics (optional):** Umami or Vercel Analytics

## 6.1 Design tokens (starter)

```css
:root {
  --bg: #f8fafc;
  --fg: #0f172a;
  --muted: #64748b;
  --line: #cbd5e1;
  --accent: #2563eb;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --fg: #e2e8f0;
  --muted: #94a3b8;
  --line: #334155;
  --accent: #60a5fa;
}
```

Only `--bg` in dark mode is confirmed from the reference. The rest are placeholders.

## 7. Content I need to prepare

- [ ] Name, role, tagline
- [ ] Short bio (2–3 sentences)
- [ ] Photo or avatar
- [ ] Skills list
- [ ] 3–6 projects (title, description, stack, links, screenshot)
- [ ] Experience entries
- [ ] Contact email and social links
- [ ] Resume PDF (optional)
- [ ] Favicon and Open Graph image

## 8. Build plan

1. Collect reference material (screenshots of every section in both themes, mobile and desktop)
2. Write the design tokens and base layout
3. Build the navbar and theme toggle
4. Build sections one by one, starting with the hero
5. Add the blueprint details (grid background, borders, annotations)
6. Fill in real content
7. Responsive pass, accessibility pass, performance pass
8. Deploy and connect a custom domain

## 9. Open questions

- Is this portfolio for me personally or for the company?
- Which sections from the reference do I want to keep or drop?
- Do I need a contact form with a backend, or just links?
- Custom domain name?

## 10. Notes on "1:1"

Matching layout, spacing, interactions and overall aesthetic is fine for inspiration. The original's wording, photos, project entries, logo and source code belong to its author, so everything user-facing should be replaced with my own material.
