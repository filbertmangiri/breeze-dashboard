import type { ReactNode } from 'react'

import { settingsSidebar } from '@/constants/sidebar-nav/settings'

export function SettingsLayout({ children }: { children: ReactNode }) {
  return children
}

SettingsLayout.breadcrumb = {
  title: 'Settings',
  url: '/settings',
}

SettingsLayout.sidebar = settingsSidebar
