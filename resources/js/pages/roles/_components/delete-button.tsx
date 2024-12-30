import type { Role } from '@/types/bouncer'
import type { ReactNode } from 'react'

import { useForm } from '@inertiajs/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useAlertConfirmation } from '@/components/confirmation-dialog'
import { LoadingSpinner } from '@/components/icons/loading-spinner'

export function DeleteButton({
  role,
  children,
  asDropdownMenuItem,
}: {
  role: Role
  children: ReactNode
  asDropdownMenuItem?: boolean
}) {
  const form = useForm()

  const { confirm } = useAlertConfirmation({
    title: 'Delete role',
    description: `Are you sure you want to delete the role "${role.title}"?`,
    onConfirm: () => {
      form.delete('/roles/' + role.name, {
        onSuccess: () => {
          toast.success('Role deleted successfully')
        },
      })
    },
  })

  const Comp = asDropdownMenuItem ? DropdownMenuItem : Button

  return (
    <Comp type="button" onClick={() => confirm()} variant="destructive" disabled={form.processing}>
      {form.processing ? <LoadingSpinner /> : children}
    </Comp>
  )
}
