---
description: Coding rules and forbidden patterns for source code
globs: ["src/**"]
---

## Coding Rules

- Choose the **simplest implementation** possible
- Do **not** add features that were not requested
- Type annotations on all public APIs
- Star export/import is **forbidden**
- File names: `kebab-case` / Classes: `PascalCase` / Functions: `camelCase` / Constants: `UPPER_SNAKE_CASE`

## Path Aliases

- `@/*` → `./src/*`, `~/*` → `./public/*`

## Forbidden Patterns

- `utils/`, `helpers/`, `common/` folders outside `shared/`
- Relative paths (`../../`) to bypass layer rules
- Business logic in `shared/`
- Circular dependencies between slices
- Importing slice internals (bypassing `index.ts`)
- Domain model importing framework code directly

## Next.js Patterns

- Always use `'use client'` directive when client interactivity is needed
- Always use Promise for page.tsx params props (Next.js 15+ pattern)

## Hydration-Safe Pattern (Radix UI)

```typescript
'use client';
import dynamic from 'next/dynamic';
export const MyComponent = dynamic(
  () => import('./my-component').then((mod) => mod.default),
  { ssr: false }
);
```

## External API/Library Usage

When using external APIs or third-party libraries, **search official docs first** before writing code. Never rely on memory alone. Priority: Official docs > GitHub README > Official blog.
