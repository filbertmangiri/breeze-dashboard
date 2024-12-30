import type { Datatable } from '@/types/datatable'
import type { LucideIcon } from 'lucide-react'

import { Link } from '@inertiajs/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import React from 'react'

import { cn } from '@/utils/class'
import { Button } from '@/components/ui/button'

const PaginationLink = ({
  href,
  srText,
  icon: Icon,
  hiddenOnMd,
  disabled,
}: {
  href?: string
  srText: string
  icon: LucideIcon
  hiddenOnMd?: boolean
  disabled?: boolean
}) => {
  const isDisabled = !href || disabled
  const Comp = isDisabled ? 'button' : Link

  const icon = (
    <>
      <span className="sr-only">{srText}</span>
      <Icon className="h-4 w-4" />
    </>
  )

  return (
    <Button
      asChild={!isDisabled}
      type="button"
      size="icon"
      variant="outline"
      disabled={isDisabled}
      className={cn('bg-background', hiddenOnMd && 'hidden md:inline-flex')}
    >
      {isDisabled ? icon : <Comp href={href}>{icon}</Comp>}
    </Button>
  )
}

export default function TablePagination({ datatable }: { datatable: Datatable<unknown> }) {
  return (
    <div className="flex items-center justify-between">
      <div className="hidden md:block">
        <p className="text-xs">
          Showing <span className="font-bold">{datatable.from || 0}</span> to{' '}
          <span className="font-bold">{datatable.to || 0}</span> of{' '}
          <span className="font-bold">{datatable.total}</span> entries
        </p>
      </div>

      <div className="block space-x-1 md:hidden">
        <PaginationLink
          href={datatable.first_page_url}
          srText="Go to first page"
          icon={ChevronsLeftIcon}
          disabled={datatable.current_page === 1}
        />
        <PaginationLink
          href={datatable.prev_page_url}
          srText="Go to previous page"
          icon={ChevronLeftIcon}
          disabled={datatable.current_page === 1}
        />
      </div>

      <div className="text-xs font-bold">
        {datatable.current_page} / {datatable.last_page}
      </div>

      <div className="flex items-center space-x-2">
        <PaginationLink
          href={datatable.first_page_url}
          srText="Go to first page"
          icon={ChevronsLeftIcon}
          disabled={datatable.current_page === 1}
          hiddenOnMd
        />
        <PaginationLink
          href={datatable.prev_page_url}
          srText="Go to previous page"
          icon={ChevronLeftIcon}
          disabled={datatable.current_page === 1}
          hiddenOnMd
        />
        <PaginationLink
          href={datatable.next_page_url}
          srText="Go to next page"
          icon={ChevronRightIcon}
          disabled={datatable.current_page === datatable.last_page}
        />
        <PaginationLink
          href={datatable.last_page_url}
          srText="Go to last page"
          icon={ChevronsRightIcon}
          disabled={datatable.current_page === datatable.last_page}
        />
      </div>
    </div>
  )
}
