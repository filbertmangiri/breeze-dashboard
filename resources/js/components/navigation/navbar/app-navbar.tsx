import { useIsMobile } from '@/hooks/use-is-mobile'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { NavbarBreadcrumb } from '@/components/navigation/navbar/navbar-breadcrumb'
import { NavbarUser } from '@/components/navigation/navbar/navbar-user'

export function AppNavbar({ breadcrumbs }: { breadcrumbs: NavbarBreadcrumb[] }) {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <NavbarBreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div className="flex items-center gap-2 px-4">{!isMobile && <NavbarUser />}</div>
    </header>
  )
}
