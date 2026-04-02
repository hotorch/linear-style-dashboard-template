<p align="center">
<h1 align="center">Linear Style Dashboard Template</h1>

<div align="center">
  Next.js 16 + Shadcn UI + Tailwind CSS v4 + FSD 아키텍처 기반 대시보드 보일러플레이트
</div>

<br />

<div align="center">
  <img src="/public/shadcn-dashboard.png" alt="Dashboard Preview" style="max-width: 100%; border-radius: 8px;" />
</div>

## 소개

디자인 고민 없이 바로 개인 대시보드를 만들 수 있는 **시작 템플릿**입니다.
YouTube 분석, Instagram 분석 등 원하는 데이터 대시보드를 이 위에 구축하세요.

- **Feature-Sliced Design (FSD)** 아키텍처로 확장 가능한 구조
- **5가지 테마** (Purple, Blue, Green, Amber, Mono) + 다크/라이트 모드
- **61개 Shadcn UI 컴포넌트** 사전 설치
- **Cmd+K 커맨드 팔레트**, 페이지 트랜지션, 애니메이션 숫자 등 UX 기능 내장

## 기술 스택

| 카테고리 | 기술 |
|----------|------|
| 프레임워크 | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| 언어 | [TypeScript](https://www.typescriptlang.org) |
| 스타일링 | [Tailwind CSS v4](https://tailwindcss.com) |
| UI 컴포넌트 | [Shadcn UI](https://ui.shadcn.com) (61개) |
| URL 상태관리 | [Nuqs](https://nuqs.47ng.com) |
| 폼 | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| 테이블 | [TanStack React Table](https://tanstack.com/table) |
| 차트 | [Recharts](https://recharts.org) |
| 커맨드 팔레트 | [kbar](https://kbar.vercel.app) (Cmd+K) |
| 애니메이션 | [motion](https://motion.dev) |
| 테마 | [next-themes](https://github.com/pacocoursey/next-themes) |
| 토스트 | [Sonner](https://sonner.emilkowal.dev) |
| 테스트 | [Playwright](https://playwright.dev) (E2E) |
| 코드 품질 | ESLint + Prettier + Husky |

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| Overview | `/dashboard/overview` | 차트 대시보드 (Suspense 스트리밍) |
| Exclusive | `/dashboard/exclusive` | Exclusive 페이지 |
| Profile | `/dashboard/profile` | 프로필 설정 폼 |
| Workspaces | `/dashboard/workspaces` | 워크스페이스 관리 |
| Team | `/dashboard/workspaces/team` | 팀 관리 (워크스페이스 하위) |

루트 `/` 접속 시 `/dashboard/overview`로 리다이렉트됩니다.

## 프로젝트 구조 (FSD)

```
src/
├── app/              # Next.js App Router, 라우팅, 글로벌 스타일
├── widgets/          # 독립 UI 블록 (header, sidebar, app-shell, theme-toggle)
├── features/         # 사용자 인터랙션 (overview, profile)
└── shared/           # 공용 유틸리티, UI 컴포넌트, 설정
    ├── ui/           # 61개 Shadcn 컴포넌트 + 커스텀 UI
    ├── ui/table/     # TanStack Table 보일러플레이트
    ├── lib/          # cn(), 폰트, 포매터, Nuqs 설정
    ├── forms/        # 폼 필드 컴포넌트
    ├── hooks/        # 커스텀 훅 (11개)
    ├── config/       # 네비게이션 설정, mock API
    ├── kbar/         # 커맨드 팔레트
    ├── types/        # TypeScript 타입 정의
    └── modal/        # 모달 유틸리티
```

### FSD 의존성 규칙

```
app/ → widgets/ → features/ → shared/
```

상위 레이어만 하위 레이어를 import 할 수 있습니다. 역방향 및 같은 레이어 간 import는 금지됩니다.

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm

### 설치

```bash
git clone https://github.com/hotorch/linear-style-dashboard-template.git
cd linear-style-dashboard-template
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인하세요.

## 스크립트

```bash
npm run dev              # 개발 서버 시작 (포트 3000)
npm run build            # 프로덕션 빌드
npm run lint             # ESLint 실행
npm run lint:fix         # ESLint 수정 + Prettier
npm run lint:strict      # 경고 0 허용 ESLint
npm run format           # Prettier 실행
npm run test:e2e         # Playwright E2E 테스트
npm run test:e2e:ui      # E2E 테스트 UI 모드
```

**Git Hooks**: 커밋 시 lint-staged 자동 실행, 푸시 시 빌드 체크 (Husky).

## 커스터마이징

### 테마 변경

`src/app/globals.css`와 `src/app/theme.css`에서 CSS 변수를 수정하세요.
5가지 프리셋 (Purple, Blue, Green, Amber, Mono) 중 선택하거나 커스텀 테마를 만들 수 있습니다.

### 네비게이션 추가

`src/shared/config/nav-config.ts`에서 설정:

```typescript
{
  title: 'My Page',
  url: '/dashboard/my-page',
  icon: 'myIcon',
  shortcut: ['m', 'p']
}
```

### Shadcn 컴포넌트 추가

```bash
npx shadcn@latest add <component>
```

`src/shared/ui/`에 설치됩니다.

## 테스트

```bash
# 브라우저 설치 (최초 1회)
npx playwright install

# 테스트 실행
npm run test:e2e
```

테스트 파일: `/e2e/` 디렉토리 (Page Object 패턴 사용)

## Author

**@ai.sam_hottman**

- YouTube: [https://www.youtube.com/@ai.sam_hottman](https://www.youtube.com/@ai.sam_hottman)
- GitHub: [https://github.com/hotorch](https://github.com/hotorch)

## License

MIT
