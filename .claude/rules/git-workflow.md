---
description: Commit message format and pre-completion verification checklist
---

## Commit Messages

Format: `[layer/slice] concise description`

Examples:
- `features/create-order: implement order creation API`
- `entities/user: add email validation Value Object`
- `shared/api: configure HTTP client timeout`

## Verification (Before Declaring Done)

1. **Self-review**: Re-read all changed files
2. **Lint & Type**: `npm run lint:strict` + `npx tsc --noEmit`
3. **Build**: `npm run build`
4. **FSD imports**: No cross-layer import violations
5. **Tests**: All acceptance criteria tests pass
6. **SPEC check**: All items in `acceptance.md` satisfied
