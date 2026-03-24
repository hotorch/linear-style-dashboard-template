'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/shared/ui/sidebar';

export function SidebarUserFooter() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size='lg' className='cursor-default'>
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage
              src='https://api.slingacademy.com/public/sample-users/1.png'
              alt='User'
            />
            <AvatarFallback className='rounded-lg'>U</AvatarFallback>
          </Avatar>
          <div
            className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
              state === 'collapsed'
                ? 'invisible max-w-0 overflow-hidden opacity-0'
                : 'visible max-w-full opacity-100'
            }`}
          >
            <span className='truncate text-sm font-medium'>User Name</span>
            <span className='text-muted-foreground flex items-center gap-1 truncate text-xs'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
              Online
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
