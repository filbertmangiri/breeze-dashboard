import type { ReactNode } from 'react'

export function RolesLayout({ children }: { children: ReactNode }) {
  return children
}

RolesLayout.breadcrumb = {
  title: 'Roles',
  url: '/roles',
}
