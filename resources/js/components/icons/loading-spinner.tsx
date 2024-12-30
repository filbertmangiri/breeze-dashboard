import type { LucideIcon } from 'lucide-react'

import { LoaderCircle } from 'lucide-react'

import { cn } from '@/utils/class'

export function LoadingSpinner({ className, ...props }: React.ComponentPropsWithRef<LucideIcon>) {
  return <LoaderCircle className={cn('animate-spin', className)} {...props} />
}
