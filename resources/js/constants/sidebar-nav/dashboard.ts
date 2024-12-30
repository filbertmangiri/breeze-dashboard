import type { SidebarNavs } from '@/components/navigation/sidebar/sidebar-items'

import { LayoutDashboard, ListCollapse, PlusCircle, TestTube2, UserRoundCheck } from 'lucide-react'

export const dashboardSidebar = [
  [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Roles',
      icon: UserRoundCheck,
      subs: [
        {
          title: 'View all',
          url: '/roles',
          icon: ListCollapse,
        },
        {
          title: 'Create',
          url: '/roles/create',
          icon: PlusCircle,
        },
      ],
    },
  ],
  {
    title: 'Resources',
    navs: [
      {
        title: 'Test',
        icon: TestTube2,
        subs: [
          {
            title: 'View all',
            url: '/test/1',
            icon: ListCollapse,
          },
          {
            title: 'Create',
            url: '/test/2',
            icon: PlusCircle,
          },
        ],
      },
    ],
  },
] satisfies SidebarNavs
