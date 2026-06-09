# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (migrated from npm).

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (ESLint with Next.js core-web-vitals + TypeScript rules)
- **Start production:** `pnpm start`

No test framework is configured.

## Architecture

This is a personal portfolio site built with **Next 16** (App Router), **React 19**, **Tailwind CSS v4**, and **TypeScript**. The React Compiler is enabled (`reactCompiler: true` in next.config.ts).

### Key patterns

- **Data-driven rendering:** All portfolio content (personal info, projects, experience, education, skills) lives in `src/data/portfolio.ts`. Components read it via `getPortfolio(locale)` — content changes go there, not in components.
- **i18n (next-intl):** Locale-routed with `next-intl`. Locales `en` (default, no URL prefix) and `es` (`/es`). `localePrefix: 'as-needed'` keeps English URLs unprefixed (`/`, `/cv`) and Spanish at `/es`, `/es/cv`. Config lives in `src/i18n/` (`routing.ts`, `request.ts`, `navigation.ts`) and `src/proxy.ts` (the locale middleware — Next 16 renamed `middleware` → `proxy`).
  - **UI strings** (chrome: nav, buttons, section titles, footer, CV labels) → message catalogs `messages/en.json` & `messages/es.json`, read with `useTranslations('Namespace')`.
  - **Content data** (`portfolio.ts`) → English is the neutral base holding all structural data (URLs, images, tags, dates, gallery). The Spanish overlay (`esProjects`/`esExperience`/`esEducation`) only overrides translatable text; `getPortfolio(locale)` merges them. To add a string: add the key to both JSON files. To translate content: edit the `es*` overlays.
  - For internal links that must respect the active locale, use `Link` from `@/i18n/navigation` (not `next/link`). The `LanguageSwitcher` (in the Navbar) swaps locale preserving the current path.
- **Style variants:** The home page supports `"bento"` and `"minimal"` layout variants controlled by the `NEXT_PUBLIC_PORTFOLIO_STYLE` env var (defaults to `"minimal"`). Section components (`Hero`, `Skills`, `Projects`, `Experience`) accept a `variant` prop.
- **Projects presentation:** `Projects.tsx` branches by variant into two internal components. `minimal` → vertical grid with "show all / show less" (`INITIAL_COUNT`). `bento` → a **drag carousel** (Embla, `embla-carousel-react`) with center-aligned slides, side peeks (non-selected slides scaled/dimmed), arrow + dot controls. In bento each `ProjectCard` is a clickable surface (no inline action buttons / no "view gallery" overlay) that opens `ProjectDetail` — a modal whose top is an **inline Embla carousel** of the project's media (built from `gallery`, falling back to `image` as a single slide), with arrows, dots, and a counter. Below it: title, demo/repo links, description, an optional **technical-highlights** bullet list (`Project.highlights` — only rendered when present), and tags. Videos play inline with controls; clicking an image slide opens the full-screen `ImageGallery` lightbox at that index (`initialIndex` prop) where long per-image descriptions and zoom live. A pointer-distance guard distinguishes carousel drag from click (in both `ProjectCard` and the modal's image slides). To save vertical space as projects grow, prefer adding projects to the bento carousel rather than the minimal stack.
- **Barrel exports:** `src/components/index.ts` re-exports all components. Imports use `@/components`.
- **Path alias:** `@/*` maps to `./src/*`.
- **Theme:** Dark/light mode via `next-themes` with `ThemeProvider` wrapping the app. Theme toggle is in `ThemeToggle.tsx`.
- **3D:** Three.js integration via `@react-three/fiber` and `@react-three/drei`.
- **Animations:** Framer Motion for UI animations.

### Routes

All routes live under `src/app/[locale]/`. There is no root `app/layout.tsx`; `app/[locale]/layout.tsx` is the root layout (owns `<html lang>` + providers).

- `/` (en) · `/es` — Main portfolio page (all sections)
- `/cv` (en) · `/es/cv` — Printable CV page (client component with `window.print()`, print-optimized CSS). The Hero "Download CV" button links here so the printed/saved CV follows the active language.

### Component organization

- `src/components/sections/` — Page sections (Hero, Skills, Projects, Experience)
- `src/components/layout/` — Navbar, Footer
- `src/components/ui/` — Reusable UI (ProjectCard, ProjectDetail, ImageGallery, ThemeToggle, SocialIcons, LanguageSwitcher)
- `src/components/theme/` — ThemeProvider wrapper
