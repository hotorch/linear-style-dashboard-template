# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This project follows three integrated principles — detailed guidance lives in skills:
- **FSD** (`/fsd`): Code structure and dependency rules
- **SDD** (`/sdd`): Write specs before implementation
- **DDD** (`/ddd`): Domain modeling and business logic isolation

## Project Overview

**Linear Style Dashboard Template** - A Next.js 16 dashboard boilerplate with Shadcn UI, Tailwind CSS v4, and FSD architecture. Designed as a starting point for building personal dashboards (YouTube analytics, Instagram analytics, etc.) without worrying about design.

## Commands

```bash
npm run dev              # Start development server (port 3000)
npm run build            # Production build
npm run lint             # Run ESLint
npm run lint:fix         # ESLint fix + Prettier
npm run lint:strict      # ESLint with zero warnings tolerance
npm run format           # Run Prettier
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Run E2E tests with UI

# Add Shadcn component
npx shadcn@latest add <component>       # Components install to src/shared/ui/
```

**Git hooks (Husky)**: Pre-commit (lint-staged), Pre-push (build check).

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 + Shadcn UI (61 components)
- **Theming**: 5 themes (Purple, Blue, Green, Amber, Mono) + Dark/Light mode
- **State**: Nuqs (URL state)
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack React Table (shared/ui/table/ boilerplate)
- **Charts**: Recharts
- **Command Palette**: kbar (Cmd+K)
- **Animation**: motion (page transitions, animated numbers, stagger groups)
- **Other**: next-themes, sonner (toasts), nextjs-toploader, react-responsive

---

## Project Structure (FSD)

```
src/
├── app/           # Next.js App Router, global styles, routing
├── widgets/       # Independent UI blocks (header, sidebar, app-shell, theme-toggle)
├── features/      # User interactions — overview, profile
├── entities/      # Domain objects (create when needed, does not exist yet)
└── shared/        # Reusable utilities, UI (61 Shadcn components), configs
```

### FSD Dependency Rules (NEVER VIOLATE)

```
✅ app/ → widgets/ → features/ → entities/ → shared/
❌ entities/ → features/       (reverse direction)
❌ features/A → features/B    (same-layer cross-reference)
```

1. Only upper layers may import from lower layers. Reverse imports forbidden.
2. No cross-slice imports within the same layer.
3. Every slice exposes only through its Public API (`index.ts`).

### Routes

All routes under `src/app/dashboard/`:
- **`/dashboard/overview`** — Charts dashboard (Suspense streaming with async server components)
- **`/dashboard/exclusive`** — Exclusive page
- **`/dashboard/profile`** — Profile settings (catch-all `[[...profile]]`)
- **`/dashboard/workspaces`** — Workspaces page (nested `/team`)

Root `/` redirects to `/dashboard/overview`.

### Feature Slices

| Slice | Segments | Purpose |
|-------|----------|---------|
| `features/overview/` | `components/` | Charts, stat cards, greeting, recent sales |
| `features/profile/` | `components/`, `utils/` | Profile settings form |

### Widgets

| Widget | Purpose |
|--------|---------|
| **header** | Sticky header with breadcrumbs, search (kbar), user-nav, theme controls |
| **sidebar** | Collapsible sidebar with nav items, org switcher |
| **app-shell** | Page container with scroll area, heading, page transitions |
| **theme-toggle** | Theme provider (next-themes) |

### Shared Layer

| Directory | Purpose |
|-----------|---------|
| `ui/` | 61 Shadcn components + custom UI (animated-number, stagger-group, etc.) |
| `ui/table/` | TanStack React Table boilerplate (data-table, filters, pagination) |
| `lib/` | `cn()`, fonts, formatters, data-table helpers, URL search params (Nuqs), `hooks/` sub-dir |
| `forms/` | Form field components (input, select, checkbox, date-picker, etc.) |
| `hooks/` | Custom hooks (11 hooks: data-table, breadcrumbs, media-query, nav, mobile, debounce, etc.) |
| `config/` | Navigation config, mock API, app info |
| `kbar/` | Command palette integration |
| `types/` | Shared TypeScript type definitions |
| `modal/` | Modal utilities |

---

## Development Guidelines

> Coding rules, forbidden patterns, path aliases, and hydration patterns → `.claude/rules/coding-standards.md`
> Code placement decision tree → `.claude/rules/fsd-architecture.md`
> Commit messages and verification checklist → `.claude/rules/git-workflow.md`

### Testing

- E2E tests: `/e2e/` directory with Page Object pattern (`e2e/pages/`)
- Config: `playwright.config.ts` at project root

---

## Adding New Features

1. **Write SPEC first** (`/sdd`) — Create `specs/[SPEC-ID]/` directory (if not exists) with spec, plan, acceptance docs.
2. **Create feature slice** (`/fsd`) — `src/features/[name]/` with proper segments.
3. **Write tests first** (TDD: RED → GREEN → REFACTOR).
4. **Export public API** in `index.ts`.
5. **Create route** in `src/app/dashboard/[name]/page.tsx`.
6. **Add to navigation** in `src/shared/config/nav-config.ts`.

