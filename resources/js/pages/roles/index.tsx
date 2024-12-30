import type { Role } from '@/types/bouncer'
import type { Datatable } from '@/types/datatable'
import type { ColumnDef } from '@tanstack/react-table'

import { Link, usePage } from '@inertiajs/react'
import { MoreHorizontal } from 'lucide-react'

import useDebouncedSearch from '@/hooks/use-debounced-search'
import useSorting from '@/hooks/use-sorting'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/datatable'
import TableSortHeader from '@/components/datatable/sort-header'
import { AppLayout } from '@/layouts/app'
import { DashboardLayout } from '@/layouts/app/dashboard'
import { DeleteButton } from '@/pages/roles/_components/delete-button'
import { RolesLayout } from '@/pages/roles/_components/layout'

export default function ViewAllRolePage({ roles }: { roles: Datatable<Role> }) {
  const {
    url,
    props: { filters },
  } = usePage()

  const { params, setParams, setTimeDebounce } = useDebouncedSearch(url, filters)
  const { sort } = useSorting(filters, setParams)

  return (
    <DataTable
      meta={roles}
      columns={
        [
          {
            accessorKey: 'title',
            header: () => (
              <TableSortHeader
                onClick={() => {
                  setTimeDebounce(50)
                  sort('title')
                }}
                sort={params.col === 'title' ? params.sort : undefined}
              >
                Name
              </TableSortHeader>
            ),
          },
          {
            accessorKey: 'abilities_count',
            header: 'Abilities',
          },
          {
            id: 'actions',
            cell: ({ row }) => {
              const role = row.original

              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={'/roles/' + role.name}>Edit</Link>
                    </DropdownMenuItem>
                    {role.deletable && (
                      <>
                        <DropdownMenuSeparator />
                        <DeleteButton asDropdownMenuItem role={role}>
                          Delete
                        </DeleteButton>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        ] satisfies ColumnDef<Role>[]
      }
    />
  )
}

ViewAllRolePage.layout = [AppLayout, DashboardLayout, RolesLayout]
