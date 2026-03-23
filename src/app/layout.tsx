import { fontVariables } from '@/shared/lib/font';
import { cn } from '@/shared/lib/utils';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/widgets/theme-toggle';
import Providers from '@/app/providers';
import { Toaster } from '@/shared/ui/sonner';
import React from 'react';
import './globals.css';
import './theme.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#0B0C0E'
};

export const metadata = {
  title: 'Linear Style Dashboard',
  description:
    'Next.js Dashboard Boilerplate with Shadcn UI and FSD Architecture'
};

export const viewport = {
  themeColor: META_THEME_COLORS.dark
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background selection:bg-primary/20 selection:text-primary min-h-screen overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : 'theme-default',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader color='#5E6AD2' showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
