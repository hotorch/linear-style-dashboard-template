import KBar from '@/shared/kbar';
import { Header } from '@/widgets/header';
import { AppSidebarClient } from '@/widgets/sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { InfobarProvider } from '@/shared/ui/infobar';
import { PageTransition } from '@/widgets/app-shell';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Linear Style Dashboard',
  description:
    'Next.js Dashboard Boilerplate with Shadcn UI and FSD Architecture'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebarClient />
        <SidebarInset>
          <div className='sidebar-glow hidden dark:block' />
          <Header />
          <InfobarProvider>
            <PageTransition>{children}</PageTransition>
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
