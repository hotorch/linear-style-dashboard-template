'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/shared/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/shared/ui/sidebar';
import { navItems } from '@/shared/config/nav-config';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { useFilteredNavItems } from '@/shared/hooks/use-nav';
import { IconChevronRight } from '@tabler/icons-react';
import { motion, useReducedMotion, LayoutGroup } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '@/shared/ui/icons';
import { OrgSwitcher } from './org-switcher';

function SidebarActiveIndicator() {
  return (
    <motion.div
      layoutId='sidebar-active'
      className='bg-primary/10 absolute inset-0 rounded-md'
      style={{ zIndex: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
    />
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const filteredItems = useFilteredNavItems(navItems);

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  const prefersReducedMotion = useReducedMotion();

  return (
    <Sidebar collapsible='icon' className='border-border/40 border-r'>
      <SidebarHeader>
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <LayoutGroup id='sidebar-nav'>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                return item?.items && item?.items?.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className='group/collapsible'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={pathname === item.url}
                          className='data-[active=true]:bg-primary/10 data-[active=true]:text-primary relative'
                        >
                          {pathname === item.url && !prefersReducedMotion && (
                            <SidebarActiveIndicator />
                          )}
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                          <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className='data-[active=true]:bg-primary/10 data-[active=true]:text-primary relative'
                              >
                                <Link href={subItem.url}>
                                  {pathname === subItem.url &&
                                    !prefersReducedMotion && (
                                      <SidebarActiveIndicator />
                                    )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      className='data-[active=true]:bg-primary/10 data-[active=true]:text-primary relative'
                    >
                      <Link href={item.url}>
                        {pathname === item.url && !prefersReducedMotion && (
                          <SidebarActiveIndicator />
                        )}
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </LayoutGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
