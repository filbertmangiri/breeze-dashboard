import type { SidebarNavs } from '@/components/navigation/sidebar/sidebar-items'

import { LockKeyhole, Settings, User2 } from 'lucide-react'

export const settingsSidebar = [
  [
    {
      title: 'Profile',
      url: '/settings/profile',
      icon: User2,
    },
    {
      title: 'Account',
      url: '/settings/account',
      icon: Settings,
    },
    {
      title: 'Change password',
      url: '/settings/change-password',
      icon: LockKeyhole,
    },
  ],
] satisfies SidebarNavs
