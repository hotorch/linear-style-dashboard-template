export { default as AppSidebar } from './app-sidebar';
export { InfoSidebar } from './info-sidebar';
export { NavMain } from './nav-main';
export { NavProjects } from './nav-projects';
export { NavUser } from './nav-user';
export { OrgSwitcher } from './org-switcher';

// Client-side only wrappers (prevents Radix UI hydration mismatch)
export { AppSidebarClient, InfoSidebarClient } from './sidebar-wrapper';
