# Blog Luca Baroncini

## Stack
- Astro 5 + MDX + Tailwind CSS v4 + TypeScript
- Deploy: Cloudflare Workers (static assets), dominio lucabaroncini.tech; ogni branch ha un preview environment
- Analytics: Cloudflare Web Analytics, automatic setup sul dominio (no cookies, niente beacon nel codice)

## Convenzioni

### Lingua
- HTML: `lang="it"`, UI in italiano, post in italiano
- Locale: `it-IT` per formattazione date

### Struttura
- `src/content/blog/` — post MDX
- `src/components/` — componenti Astro
- `src/components/mdx/` — componenti per uso dentro MDX
- `src/layouts/` — layout pagine
- `src/lib/` — utilities e costanti
- `src/styles/` — CSS globale
- `src/assets/` — immagini (processate da Astro)
- `public/` — file statici (font, favicon, robots.txt)

### CSS
- Tailwind v4 con `@theme` in `src/styles/global.css`
- Palette OKLCH con variabili CSS custom
- Dark mode via classe `.dark` su `<html>`
- Niente `@apply` — usa classi Tailwind inline

### Componenti
- Zero JS framework client-side (no React, no Vue)
- Script client-side solo vanilla e minimi: dark mode toggle, copy button, filtri delle pagine `/osservatorio`
- Componenti MDX: Callout, YouTube, ImageGallery

### Post
- Frontmatter: title, description, pubDate, tags[], draft
- Tags permessi: ai, agenti, tech, politics, climbing, javascript, typescript, astro, web, opinion, tutorial, personal
- Immagini in `src/assets/`, non in `public/`

### Comandi
- `npm run dev` — dev server
- `npm run build` — build statica
- `npm run preview` — preview build
