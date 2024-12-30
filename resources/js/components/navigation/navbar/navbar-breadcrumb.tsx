import { Link, usePage } from '@inertiajs/react'

import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export type NavbarBreadcrumb = {
  title: string
  url?: string
}

export function NavbarBreadcrumb({ breadcrumbs }: { breadcrumbs: NavbarBreadcrumb[] }) {
  const pathname = usePage().url

  if (!breadcrumbs) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={index}>
            {breadcrumb.url && breadcrumb.url !== pathname ? (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.url}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}

            <BreadcrumbSeparator className="hidden last:hidden md:block" />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
