<p align="center">
<h1 align="center">Next.js Dashboard Starter Template</h1>

<div align="center">
  Production-ready admin dashboard built with Next.js 16, Shadcn UI, Tailwind CSS v4, and Feature-Sliced Design architecture
</div>

<br />

<div align="center">
  <img src="/public/shadcn-dashboard.png" alt="Dashboard Preview" style="max-width: 100%; border-radius: 8px;" />
</div>

## Overview

A **production-ready admin dashboard template** built with modern technologies and best practices. Perfect for **SaaS applications**, **internal tools**, and **admin panels**.

### Key Highlights

- **Feature-Sliced Design (FSD)** architecture for scalable, maintainable code
- **Next.js 16** with App Router and Turbopack
- **Supabase** ready for backend (database, auth)
- **Internationalization** with next-intl (English, Korean)
- **E2E Testing** with Playwright
- **Email Service** with Resend + React Email

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Components | [Shadcn UI](https://ui.shadcn.com) |
| Backend | [Supabase](https://supabase.com) |
| Email | [Resend](https://resend.com) + [React Email](https://react.email) |
| i18n | [next-intl](https://next-intl-docs.vercel.app) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) |
| URL State | [Nuqs](https://nuqs.47ng.com) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Tables | [TanStack Table](https://tanstack.com/table) |
| Testing | [Playwright](https://playwright.dev) |
| Command Palette | [kbar](https://kbar.vercel.app) |
| Error Tracking | [Sentry](https://sentry.io) |
| Linting | ESLint + Prettier |
| Git Hooks | Husky |

## Features

### Core Features

- **Admin Dashboard Layout** - Pre-built sidebar, header, and content area
- **Analytics Overview** - Cards and charts with Recharts
- **Data Tables** - Server-side search, filter, and pagination
- **Kanban Board** - Drag & drop task management with dnd-kit
- **Forms** - React Hook Form with Zod validation
- **Command Palette** - Cmd+K navigation interface

### Architecture & Developer Experience

- **Feature-Sliced Design** - Scalable folder structure with clear boundaries
- **Internationalization** - Multi-language support (EN, KO)
- **Theme System** - Light/dark mode with CSS variables
- **E2E Testing** - Playwright test suite
- **Email Templates** - React Email components

### Navigation & Access Control

- **RBAC Navigation** - Client-side filtering based on roles/permissions
- **Infobar Component** - Contextual tips and status messages
- **Breadcrumbs** - Dynamic route-based breadcrumbs

## Project Structure (FSD)

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n routes
│   │   ├── dashboard/      # Dashboard pages
│   │   └── auth/           # Auth pages
│   └── api/                # API routes
│
├── widgets/                # Independent UI blocks
│   ├── header/             # Header, breadcrumbs, search
│   ├── sidebar/            # Navigation sidebar
│   ├── app-shell/          # Page container
│   └── theme-toggle/       # Theme switcher
│
├── features/               # User interactions & business logic
│   └── [feature]/
│       ├── ui/
│       ├── model/
│       └── index.ts
│
├── entities/               # Business domain objects
│   └── [entity]/
│       ├── model/
│       └── index.ts
│
├── shared/                 # Shared resources
│   ├── ui/                 # Shadcn components
│   ├── lib/                # Utilities, Supabase, Email
│   ├── hooks/              # Custom hooks
│   ├── config/             # App configuration
│   └── types/              # TypeScript types
│
├── i18n/                   # i18n configuration
└── messages/               # Translation files (en.json, ko.json)
```

### FSD Import Rules

| Layer | Can Import From |
|-------|-----------------|
| app | widgets, features, entities, shared |
| widgets | features, entities, shared |
| features | entities, shared |
| entities | shared |
| shared | (no dependencies) |

## Pages

| Page | Description |
|------|-------------|
| **Dashboard Overview** | Analytics cards with Recharts, parallel routes for independent loading |
| **Product List** | TanStack table with server-side search, filter, pagination |
| **Product Form** | React Hook Form + Zod validation |
| **Kanban Board** | Drag & drop task management with Zustand persistence |
| **Profile** | User profile management |
| **Workspaces** | Organization/workspace management |
| **Team Management** | Team members and roles (requires org context) |
| **Billing** | Subscription management (requires org context) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hotorch/hottman-style-dashboard-template.git
   cd hottman-style-dashboard-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example.txt .env.local
   ```

4. **Configure environment variables**
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Email (Resend)
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM="App <noreply@yourdomain.com>"

   # Sentry (optional)
   SENTRY_DSN=your_sentry_dsn
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run start         # Start production server

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors + Prettier
npm run format        # Run Prettier

# Testing
npm run test:e2e      # Run Playwright tests
npm run test:e2e:ui   # Playwright UI mode
npm run test:e2e:debug # Debug mode

# Email
npm run email:dev     # React Email dev server
```

## Backend Setup

### Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### Email (Resend)

1. Create an account at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM="App <noreply@yourdomain.com>"
   ```

## Adding Features

### New Feature (FSD Pattern)

1. Create feature directory:
   ```
   src/features/my-feature/
   ├── ui/
   │   ├── MyComponent.tsx
   │   └── index.ts
   ├── model/
   │   ├── use-my-feature.ts
   │   └── index.ts
   └── index.ts
   ```

2. Export public API:
   ```typescript
   // features/my-feature/index.ts
   export { MyComponent } from './ui';
   export { useMyFeature } from './model';
   ```

3. Create route:
   ```
   src/app/[locale]/dashboard/my-feature/page.tsx
   ```

4. Add to navigation:
   ```typescript
   // src/shared/config/nav-config.ts
   {
     title: 'My Feature',
     url: '/dashboard/my-feature',
     icon: 'myIcon',
   }
   ```

### New Shadcn Component

```bash
npx shadcn@latest add button
```

Components are installed to `src/shared/ui/`.

## Internationalization

Supported locales: `en` (default), `ko`

### Adding Translations

1. Edit `src/messages/en.json` and `src/messages/ko.json`
2. Use translations in components:
   ```typescript
   import { useTranslations } from 'next-intl';

   function MyComponent() {
     const t = useTranslations('MyNamespace');
     return <h1>{t('title')}</h1>;
   }
   ```

## Testing

### Run E2E Tests

```bash
# Install browsers (first time)
npx playwright install

# Run tests
npm run test:e2e

# UI mode
npm run test:e2e:ui
```

### Test Structure

```
e2e/
├── pages/              # Page Object Models
│   ├── base.page.ts
│   └── dashboard.page.ts
├── auth.spec.ts
├── navigation.spec.ts
└── dashboard.spec.ts
```

## Customization

### Theme

Edit CSS variables in `src/app/globals.css` and `src/app/theme.css`.

### Navigation

Configure in `src/shared/config/nav-config.ts`:

```typescript
{
  title: 'Dashboard',
  url: '/dashboard/overview',
  icon: 'dashboard',
  access: { requireOrg: true }, // Optional RBAC
}
```

## Author

**@ai.sam_hottman**

- YouTube: [https://www.youtube.com/@ai.sam_hottman](https://www.youtube.com/@ai.sam_hottman)
- GitHub: [https://github.com/hotorch](https://github.com/hotorch)

## License

MIT

## Acknowledgements

- [Shadcn UI](https://ui.shadcn.com) for the beautiful components
- [Next.js](https://nextjs.org) for the framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Feature-Sliced Design](https://feature-sliced.design) for architecture patterns
