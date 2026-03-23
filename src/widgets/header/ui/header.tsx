import React from 'react';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { Separator } from '@/shared/ui/separator';
import { Breadcrumbs } from './breadcrumbs';
import SearchInput from './search-input';
import CtaGithub from './cta-github';
import {
  UserNavClient,
  ModeToggleClient,
  ThemeSelectorClient
} from './header-client-components';

export default function Header() {
  return (
    <header className='bg-background/60 border-border/40 sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2'>
        <CtaGithub />
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNavClient />
        <ModeToggleClient />
        <ThemeSelectorClient />
      </div>
    </header>
  );
}
