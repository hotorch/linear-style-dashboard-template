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

**Pre-commit hooks**: Husky + lint-staged runs automatically on `git commit`.

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
├── entities/      # Core business domain objects (empty in template)
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
- **`/dashboard/overview`** — Charts dashboard (parallel routes: @area_stats, @bar_stats, @pie_stats, @sales)
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
| `lib/` | `cn()`, fonts, formatters, data-table helpers, URL search params (Nuqs) |
| `forms/` | Form field components (input, select, checkbox, date-picker, etc.) |
| `hooks/` | `use-breadcrumbs`, `use-media-query`, `use-data-table` |
| `config/` | Navigation config, mock API, app info |
| `kbar/` | Command palette integration |
| `types/` | Shared TypeScript type definitions |
| `modal/` | Modal utilities |

---

## Development Guidelines

### Next.js Patterns

- Always use `'use client'` directive when client interactivity is needed
- Always use Promise for page.tsx params props (Next.js 15+ pattern)

### Hydration-Safe Pattern (Radix UI)

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

### Coding Rules

- Choose the **simplest implementation** possible
- Do **not** add features that were not requested
- Type annotations on all public APIs
- Star export/import is **forbidden**
- File names: `kebab-case` / Classes: `PascalCase` / Functions: `camelCase` / Constants: `UPPER_SNAKE_CASE`

### Forbidden Patterns

- `utils/`, `helpers/`, `common/` folders outside `shared/`
- Relative paths (`../../`) to bypass layer rules
- Business logic in `shared/`
- Circular dependencies between slices
- Importing slice internals (bypassing `index.ts`)
- Domain model importing framework code directly

### Code Placement Decision Tree

1. Pure utility with no business logic? → `shared/`
2. Rule of a specific domain model? → `entities/[domain]/`
3. Feature reused across multiple pages? → `features/[action]/`
4. Used only in a specific page? → `app/dashboard/[page]/`

Start in the narrowest scope. Only move to a lower layer when reuse scope widens.

### External API/Library Usage

When using external APIs or third-party libraries, **search official docs first** before writing code. Never rely on memory alone. Priority: Official docs > GitHub README > Official blog.

### Commit Messages

```
[layer/slice] concise description

Examples:
features/create-order: implement order creation API
entities/user: add email validation Value Object
shared/api: configure HTTP client timeout
```

---

## Adding New Features

1. **Write SPEC first** (`/sdd`) — Create `specs/[SPEC-ID]/` with spec, plan, acceptance docs.
2. **Create feature slice** (`/fsd`) — `src/features/[name]/` with proper segments.
3. **Write tests first** (TDD: RED → GREEN → REFACTOR).
4. **Export public API** in `index.ts`.
5. **Create route** in `src/app/dashboard/[name]/page.tsx`.
6. **Add to navigation** in `src/shared/config/nav-config.ts`.

---

## Verification (Before Declaring Done)

1. **Self-review**: Re-read all changed files
2. **Lint & Type**: `npm run lint:strict` + `npx tsc --noEmit`
3. **Build**: `npm run build`
4. **FSD imports**: No cross-layer import violations
5. **Tests**: All acceptance criteria tests pass
6. **SPEC check**: All items in `acceptance.md` satisfied
