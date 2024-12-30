import type { LucideIcon } from 'lucide-react'

import { Link, usePage } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'

import { Fragment, useMemo } from 'react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

export type SidebarNavs = (SidebarNav[] | SidebarGroup)[]

type SidebarGroup = {
  title: string
  navs: SidebarNav[]
}

type SidebarNav = SidebarNavLink | SidebarNavCollapsable

type SidebarNavBase = {
  title: string
  icon: LucideIcon
}

type SidebarNavLink = SidebarNavBase & {
  url: string
}

type SidebarNavCollapsable = SidebarNavBase & {
  subs: SidebarSubNav[]
}

type SidebarSubNav = {
  title: string
  url: string
  icon?: LucideIcon
}

export function SidebarItems({ sidebar: navigations }: { sidebar?: SidebarNavs }) {
  const { url: pathname } = usePage()

  return navigations?.map((navsOrGroup, index) => (
    <Fragment key={index}>
      <SidebarGroup className="first:pt-4 last:pb-4">
        {!(navsOrGroup instanceof Array) ? (
          <>
            <SidebarGroupLabel>{navsOrGroup.title}</SidebarGroupLabel>
            <Navs navs={navsOrGroup.navs} pathname={pathname} group={navsOrGroup.title} />
          </>
        ) : (
          <Navs navs={navsOrGroup} pathname={pathname} />
        )}
      </SidebarGroup>

      {index + 1 !== navigations.length && (
        <Separator className="ml-2 w-8 group-data-[state=expanded]:hidden max-md:hidden" />
      )}
    </Fragment>
  ))
}

function Navs({ navs, pathname, group }: { navs: SidebarNav[]; pathname: string; group?: string }) {
  return (
    <SidebarMenu>
      {navs.map((nav, index) =>
        'url' in nav ? (
          <NavLink key={index} nav={nav} pathname={pathname} group={group} />
        ) : (
          <NavCollapsable key={index} nav={nav} pathname={pathname} group={group} />
        ),
      )}
    </SidebarMenu>
  )
}

function NavLink({
  nav,
  pathname,
  group,
}: {
  nav: SidebarNavLink
  pathname: string
  group?: string
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={nav.url === pathname}
        tooltip={<TooltipBreadcrumb group={group} title={nav.title} />}
      >
        <Link href={nav.url}>
          <nav.icon />
          <span>{nav.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function NavCollapsable({
  nav,
  group,
  pathname,
}: {
  nav: SidebarNavCollapsable
  group?: string
  pathname: string
}) {
  const { open, isMobile } = useSidebar()

  const isActive = useMemo(() => {
    return nav.subs.some((sub) => sub.url === pathname)
  }, [nav.subs, pathname])

  if (open || isMobile) {
    return (
      <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton isActive={isActive} preventDefault>
              <nav.icon />
              <span>{nav.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SubNavsExpanded subs={nav.subs} pathname={pathname} />
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <DropdownMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            isActive={isActive}
            tooltip={<TooltipBreadcrumb group={group} title={nav.title} />}
            tooltipPreventDefault
          >
            <nav.icon />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>
            {<TooltipBreadcrumb group={group} title={nav.title} />}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SubNavsCollapsed subs={nav.subs} pathname={pathname} />
        </DropdownMenuContent>
      </SidebarMenuItem>
    </DropdownMenu>
  )
}

function SubNavsExpanded({ subs, pathname }: { subs: SidebarSubNav[]; pathname: string }) {
  return (
    <SidebarMenuSub>
      {subs.map((sub, index) => (
        <SidebarMenuSubItem key={index}>
          <SidebarMenuSubButton asChild isActive={sub.url === pathname}>
            <Link href={sub.url}>
              {sub?.icon && <sub.icon />}
              <span>{sub.title}</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  )
}

function SubNavsCollapsed({ subs, pathname }: { subs: SidebarSubNav[]; pathname: string }) {
  return subs.map((sub, index) => (
    <DropdownMenuItem key={index} asChild isActive={sub.url === pathname}>
      <Link href={sub.url}>
        {sub?.icon && <sub.icon />}
        <span>{sub.title}</span>
      </Link>
    </DropdownMenuItem>
  ))
}

function TooltipBreadcrumb({ group, title }: { group?: string; title: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {group}
      {group && <ChevronRight className="size-3.5" />}
      {title}
    </span>
  )
}
