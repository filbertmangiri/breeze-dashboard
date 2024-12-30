import type { ReactNode } from 'react'

import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'

import React from 'react'

import { Button } from '@/components/ui/button'

const SortIcon = ({ sort }: { sort?: 'asc' | 'desc' }) => {
  if (sort === 'desc') return <ArrowDownIcon className="ml-2 h-3.5 w-3.5" />
  if (sort === 'asc') return <ArrowUpIcon className="ml-2 h-3.5 w-3.5" />
  return <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
}

export default function TableSortHeader({
  className,
  children,
  sort,
  ...props
}: {
  className?: string
  children: ReactNode
  sort?: 'asc' | 'desc'
  onClick?: () => void
}) {
  return (
    <Button variant="ghost" className={className} {...props}>
      {children}
      <SortIcon sort={sort} />
    </Button>
  )
}

/* <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-0.5 flex h-8 items-center border-none hover:bg-gray-200"
        {...props}
      >
        <span>{title}</span>
        <SortIcon sort={sort} />
      </Button>
    </div> */
