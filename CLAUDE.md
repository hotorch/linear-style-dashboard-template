# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Linear Style Dashboard Template** - A Next.js 16 dashboard boilerplate with Shadcn UI, Tailwind CSS v4, and **Feature-Sliced Design (FSD)** architecture. Designed as a starting point for building personal dashboards (YouTube analytics, Instagram analytics, etc.) without worrying about design.

## Commands

```bash
npm run dev              # Start development server (port 3000)
npm run build            # Production build
npm run lint             # Run ESLint
npm run lint:fix         # ESLint fix + Prettier
npm run lint:strict      # ESLint with zero warnings tolerance
npm run format           # Run Prettier

# Add Shadcn component
npx shadcn@latest add <component>       # Components install to src/shared/ui/
```

**Pre-commit hooks**: Husky + lint-staged runs automatically on `git commit`.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 + Shadcn UI (69 components)
- **Theming**: 5 themes (Purple, Blue, Green, Amber, Mono) + Dark/Light mode
- **State**: Zustand, Nuqs (URL state)
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack React Table
- **Charts**: Recharts
- **Command Palette**: kbar (Cmd+K)
- **DnD**: dnd-kit (kanban)
- **Other**: next-themes, motion (animations), sonner (toasts)

---

## Feature-Sliced Design (FSD) Architecture

### Layer Hierarchy

```
src/
├── app/           # Next.js App Router, global styles
├── widgets/       # Independent UI blocks (header, sidebar, app-shell, theme-toggle)
├── features/      # User interactions and business scenarios
├── entities/      # Core business domain objects (empty in template)
└── shared/        # Reusable utilities, UI, configs
```

### FSD Import Rules (CRITICAL)

| Layer | Can Import From |
|-------|-----------------|
| **app/** | widgets, features, entities, shared |
| **widgets/** | features, entities, shared |
| **features/** | entities, shared **only** |
| **entities/** | shared **only** |
| **shared/** | Cannot import from any other layer |

### Public API Pattern

Every slice **must** have an `index.ts` file with explicit named exports (never `export *`).

---

## Template Structure

### Routes

All routes under `src/app/dashboard/`:
- **`/dashboard/overview`** — Charts dashboard (parallel routes)
- **`/dashboard/product`** — Data table example (+ `/[productId]`)
- **`/dashboard/kanban`** — Kanban board (dnd-kit + Zustand)
- **`/dashboard/profile`** — Profile settings page
- **`/dashboard/billing`** — Billing page
- **`/dashboard/workspaces`** — Workspaces page

Root `/` redirects to `/dashboard/overview`.

### Example Features

| Feature | Purpose |
|---------|---------|
| **overview** | Chart dashboard with Recharts (bar, area, pie, sales) |
| **products** | Data table with TanStack React Table (sort, filter, paginate) |
| **kanban** | Drag & drop kanban board (dnd-kit + Zustand persist) |
| **profile** | Settings page example |

### Widgets

| Widget | Purpose |
|--------|---------|
| **header** | Sticky header with breadcrumbs, search, user-nav, theme controls |
| **sidebar** | Collapsible sidebar with nav items, org switcher |
| **app-shell** | Page container with scroll area, heading, loading states |
| **theme-toggle** | Theme provider (next-themes) |

---

## Development Guidelines

### Next.js Patterns

- Always use `'use client'` directive when client interactivity is needed
- Always use Promise for page.tsx params props (Next.js 15+ pattern)

### Hydration-Safe Pattern (Radix UI)

For components using Radix UI that cause hydration mismatches:
```typescript
'use client';
import dynamic from 'next/dynamic';
export const MyComponent = dynamic(
  () => import('./my-component').then((mod) => mod.default),
  { ssr: false }
);
```

### Path Aliases

- `@/*` → `./src/*`, `~/*` → `./public/*`

### Shared Libraries (`src/shared/lib/`)

| Library | Purpose |
|---------|---------|
| `utils.ts` | `cn()` function (clsx + tailwind-merge) |
| `font.ts` | Font variables (Geist, Geist Mono, etc.) |
| `format.ts` | Data formatting helpers |
| `data-table.ts` | TanStack table helpers |
| `searchparams.ts` | URL search params (Nuqs) |

---

## Adding New Features (FSD Way)

1. Create feature slice: `src/features/[name]/`
   ```
   features/[name]/
   ├── api/            # Server actions, API calls
   ├── ui/
   │   ├── FeatureComponent.tsx
   │   └── index.ts
   ├── model/          # Types, stores, hooks
   │   └── index.ts
   └── index.ts        # Public API exports
   ```
2. Export public API in `index.ts`
3. Create route in `src/app/dashboard/[name]/page.tsx`
4. Add to navigation in `src/shared/config/nav-config.ts`

---

## Verification (Before Declaring Done)

1. **Self-review**: Re-read changed files
2. **Lint & Type**: `npm run lint:strict` + `npx tsc --noEmit`
3. **Build**: `npm run build`
4. **FSD imports**: Verify no cross-layer import violations
