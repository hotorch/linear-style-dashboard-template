import { NavItem } from '@/shared/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: []
  },
  {
    title: 'Account',
    url: '#',
    icon: 'account',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'profile',
        shortcut: ['m', 'm']
      },
      {
        title: 'Billing',
        url: '/dashboard/billing',
        icon: 'billing',
        shortcut: ['b', 'b']
      }
    ]
  }
];
