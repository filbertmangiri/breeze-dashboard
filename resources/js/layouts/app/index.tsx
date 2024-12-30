import type { NavbarBreadcrumb } from '@/components/navigation/navbar/navbar-breadcrumb'
import type { SidebarNavs } from '@/components/navigation/sidebar/sidebar-items'
import type { NodeChildren } from '@/utils/react-node-prop'
import type { ReactNode } from 'react'

import { useMemo } from 'react'

import { getChildrenProps } from '@/utils/react-node-prop'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppNavbar } from '@/components/navigation/navbar/app-navbar'
import { AppSidebar } from '@/components/navigation/sidebar/app-sidebar'

export function AppLayout({ children }: { children: ReactNode }) {
  const breadcrumbs = useMemo(() => {
    return getChildrenProps<NavbarBreadcrumb>(children, 'breadcrumb', true)
  }, [children])

  const sidebar = useMemo(() => {
    return getChildrenProps<SidebarNavs>(children, 'sidebar')
  }, [(children as NodeChildren<SidebarNavs>)?.type?.sidebar])

  return (
    <SidebarProvider>
      <AppSidebar sidebar={sidebar} />

      <SidebarInset>
        <AppNavbar breadcrumbs={breadcrumbs} />

        <main className="flex flex-1 flex-col p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
