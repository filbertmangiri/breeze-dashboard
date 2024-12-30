import type { ReactNode } from 'react'

import { dashboardSidebar } from '@/constants/sidebar-nav/dashboard'

export function DashboardLayout({ children }: { children: ReactNode }) {
  return children
}

DashboardLayout.breadcrumb = {
  title: 'Dashboard',
  url: '/',
}

DashboardLayout.sidebar = dashboardSidebar
