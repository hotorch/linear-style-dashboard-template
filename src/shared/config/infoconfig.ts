import type { InfobarContent } from '@/shared/ui/infobar';

export const workspacesInfoContent: InfobarContent = {
  title: 'Workspaces Management',
  sections: [
    {
      title: 'Overview',
      description:
        'The Workspaces page allows you to manage your workspaces and switch between them. This feature enables multi-tenant workspace management. You can view all available workspaces, create new ones, and switch your active workspace.',
      links: []
    },
    {
      title: 'Creating Workspaces',
      description:
        'To create a new workspace, click the "Create Organization" button. You will be prompted to enter a workspace name and configure initial settings. Once created, you can switch to the new workspace and start managing it.',
      links: []
    },
    {
      title: 'Switching Workspaces',
      description:
        'You can switch between workspaces by clicking on a workspace in the list. The selected workspace becomes your active organization context, and all organization-specific features will use this workspace.',
      links: []
    },
    {
      title: 'Workspace Features',
      description:
        'Each workspace operates independently with its own team members, roles, permissions, and settings. This allows you to manage multiple projects or teams within a single account while keeping their data and settings separate.',
      links: []
    }
  ]
};

export const teamInfoContent: InfobarContent = {
  title: 'Team Management',
  sections: [
    {
      title: 'Overview',
      description:
        'The Team Management page allows you to manage your workspace team, including members, roles, security settings, and more. This page provides comprehensive organization management.',
      links: []
    },
    {
      title: 'Managing Team Members',
      description:
        'You can add, remove, and manage team members from this page. Invite new members by email, assign roles, and control their access levels. Each member can have different permissions based on their role.',
      links: []
    },
    {
      title: 'Roles and Permissions',
      description:
        'Configure roles and permissions for your organization. Roles define what actions team members can perform within the workspace. Common roles include admin, member, and custom roles you define.',
      links: []
    },
    {
      title: 'Security Settings',
      description:
        "Manage security settings for your workspace, including authentication requirements, session management, and access controls. These settings help protect your organization's data and resources.",
      links: []
    },
    {
      title: 'Navigation RBAC System',
      description:
        'The application includes a client-side navigation filtering system using the `useNav` hook. It supports `requireOrg`, `permission`, and `role` checks for access control. Navigation items are configured in `src/shared/config/nav-config.ts` with `access` properties.',
      links: []
    }
  ]
};

export const billingInfoContent: InfobarContent = {
  title: 'Billing & Plans',
  sections: [
    {
      title: 'Overview',
      description:
        "The Billing page allows you to manage your organization's subscription and usage limits. Implement your own billing solution using Stripe or other payment providers.",
      links: [
        {
          title: 'Stripe Documentation',
          url: 'https://stripe.com/docs'
        }
      ]
    },
    {
      title: 'Available Plans',
      description:
        'View and subscribe to available plans through the pricing table. Common plans include free, pro, and team tiers with different feature sets.',
      links: []
    },
    {
      title: 'Plan Features',
      description:
        'Each plan can include specific features that unlock functionality in the application. Define features for each plan and check access in your code.',
      links: []
    },
    {
      title: 'Access Control',
      description:
        'Plans and features are used for access control throughout the application. Implement server-side checks to verify plan or feature access.',
      links: []
    }
  ]
};

export const productInfoContent: InfobarContent = {
  title: 'Product Management',
  sections: [
    {
      title: 'Overview',
      description:
        'The Products page allows you to manage your product catalog. You can view all products in a table format with server-side functionality including sorting, filtering, pagination, and search capabilities. Use the "Add New" button to create new products.',
      links: []
    },
    {
      title: 'Adding Products',
      description:
        'To add a new product, click the "Add New" button in the page header. You will be taken to a form where you can enter product details including name, description, price, category, and upload product images.',
      links: []
    },
    {
      title: 'Editing Products',
      description:
        'You can edit existing products by clicking on a product row in the table. This will open the product edit form where you can modify any product information. Changes are saved automatically when you submit the form.',
      links: []
    },
    {
      title: 'Table Features',
      description:
        'The product table includes several powerful features to help you manage large product catalogs efficiently. You can sort columns by clicking on column headers, filter products using the filter controls, navigate through pages using pagination, and quickly find products using the search functionality.',
      links: []
    }
  ]
};
