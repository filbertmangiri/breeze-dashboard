import { create } from 'zustand'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const useConfirmationDialog = create<{
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  onConfirm: () => void
  setOnConfirm: (onConfirm: () => void) => void
}>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  title: '',
  setTitle: (title) => set({ title }),
  description: '',
  setDescription: (description) => set({ description }),
  onConfirm: () => {},
  setOnConfirm: (onConfirm) => set({ onConfirm }),
}))

export function useAlertConfirmation(options: {
  title?: string
  description?: string
  onConfirm: () => void
}) {
  const { setOpen, setTitle, setDescription, setOnConfirm } = useConfirmationDialog()

  return {
    confirm: () => {
      setTitle(options.title || 'Are you sure?')
      setDescription(options.description || 'This action cannot be undone.')
      setOnConfirm(options.onConfirm)

      setOpen(true)
    },
  }
}

export function ConfirmationDialog() {
  const { open, setOpen, title, description, onConfirm } = useConfirmationDialog()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || 'Are you sure?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || 'This action cannot be undone.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
