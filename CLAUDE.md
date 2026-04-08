# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint with Next.js core-web-vitals + TypeScript rules)
- **Start production:** `npm run start`

No test framework is configured.

## Architecture

This is a personal portfolio site built with **Next 16** (App Router), **React 19**, **Tailwind CSS v4**, and **TypeScript**. The React Compiler is enabled (`reactCompiler: true` in next.config.ts).

### Key patterns

- **Data-driven rendering:** All portfolio content (personal info, projects, experience, education, skills) lives in `src/data/portfolio.ts` as a single `portfolioData` object. Components read from this data — content changes go there, not in components.
- **Style variants:** The home page supports `"bento"` and `"minimal"` layout variants controlled by the `NEXT_PUBLIC_PORTFOLIO_STYLE` env var (defaults to `"minimal"`). Section components (`Hero`, `Skills`, `Projects`, `Experience`) accept a `variant` prop.
- **Barrel exports:** `src/components/index.ts` re-exports all components. Imports use `@/components`.
- **Path alias:** `@/*` maps to `./src/*`.
- **Theme:** Dark/light mode via `next-themes` with `ThemeProvider` wrapping the app. Theme toggle is in `ThemeToggle.tsx`.
- **3D:** Three.js integration via `@react-three/fiber` and `@react-three/drei`.
- **Animations:** Framer Motion for UI animations.

### Routes

- `/` — Main portfolio page (all sections)
- `/cv` — Printable CV page (client component with `window.print()`, print-optimized CSS)

### Component organization

- `src/components/sections/` — Page sections (Hero, Skills, Projects, Experience)
- `src/components/layout/` — Navbar, Footer
- `src/components/ui/` — Reusable UI (ProjectCard, ImageGallery, ThemeToggle, SocialIcons)
- `src/components/theme/` — ThemeProvider wrapper
