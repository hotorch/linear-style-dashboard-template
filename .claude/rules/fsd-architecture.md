---
description: FSD code placement guide for creating new files
globs: ["src/**"]
---

## Code Placement Decision Tree

1. Pure utility with no business logic? → `shared/`
2. Rule of a specific domain model? → `entities/[domain]/`
3. Feature reused across multiple pages? → `features/[action]/`
4. Used only in a specific page? → `app/dashboard/[page]/`

Start in the narrowest scope. Only move to a lower layer when reuse scope widens.

## Layer Notes

- `entities/` directory does not exist yet — create it when domain models are needed
- Every slice must expose its public API through `index.ts`
