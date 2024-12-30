import type { ChangeEvent, FormEvent } from 'react'

import { useForm } from '@inertiajs/react'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { InputErrors, InputPassword, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { AppLayout } from '@/layouts/app'
import { SettingsLayout } from '@/pages/auth/settings/_components/layout'

export default function SettingsChangePasswordPage() {
  const form = useForm({
    root: null,
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.patch('/settings/change-password', {
      onError: () => form.reset(),
      onSuccess: () => {
        form.reset()

        toast.success('Password successfully changed')
      },
    })
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof form.data

    form.setData(name, e.target.value)
    form.clearErrors(name)
    form.clearErrors('root')
  }

  return (
    <form onSubmit={submitHandler} className="flex w-full flex-col gap-6 sm:max-w-sm">
      {form.errors.root && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{form.errors.root}</AlertDescription>
        </Alert>
      )}

      {/* To get rid of warnings */}
      <input type="text" name="username" autoComplete="username email" className="hidden" />

      <InputWithLabel>
        <Label htmlFor="current_password">Current password</Label>
        <InputPassword
          id="current_password"
          name="current_password"
          placeholder="********"
          autoComplete="current-password"
          value={form.data.current_password}
          onChange={inputHandler}
        />
        <InputErrors>{form.errors.current_password}</InputErrors>
      </InputWithLabel>

      <InputWithLabel>
        <Label htmlFor="password">New password</Label>
        <InputPassword
          id="password"
          name="password"
          placeholder="********"
          autoComplete="new-password"
          value={form.data.password}
          onChange={inputHandler}
        />
        <InputErrors>{form.errors.password}</InputErrors>
      </InputWithLabel>

      <InputWithLabel>
        <Label htmlFor="password_confirmation">Confirm new password</Label>
        <InputPassword
          id="password_confirmation"
          name="password_confirmation"
          placeholder="********"
          autoComplete="off"
          value={form.data.password_confirmation}
          onChange={inputHandler}
        />
        <InputErrors>{form.errors.password_confirmation}</InputErrors>
      </InputWithLabel>

      <Button type="submit" disabled={form.processing || !form.isDirty}>
        {form.processing ? <LoadingSpinner /> : 'Save'}
      </Button>
    </form>
  )
}

SettingsChangePasswordPage.breadcrumb = {
  title: 'Change password',
  url: '/settings/change-password',
}
SettingsChangePasswordPage.layout = [AppLayout, SettingsLayout]
