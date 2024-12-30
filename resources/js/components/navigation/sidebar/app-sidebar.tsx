import type { SidebarNavs } from '@/components/navigation/sidebar/sidebar-items'

import * as React from 'react'

import {
  InsideSidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar'
import { SidebarBrand } from '@/components/navigation/sidebar/sidebar-brand'
import { SidebarItems } from '@/components/navigation/sidebar/sidebar-items'
import { SidebarUser } from '@/components/navigation/sidebar/sidebar-user'

export function AppSidebar({
  sidebar,
  ...props
}: React.ComponentPropsWithRef<typeof Sidebar> & {
  sidebar?: SidebarNavs
}) {
  const { isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <InsideSidebarProvider>
        <SidebarHeader>
          <SidebarBrand />
        </SidebarHeader>
        <SidebarContent>
          <SidebarItems sidebar={sidebar} />
        </SidebarContent>
        {isMobile && (
          <SidebarFooter>
            <SidebarUser />
          </SidebarFooter>
        )}
      </InsideSidebarProvider>
    </Sidebar>
  )
}
