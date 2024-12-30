import type { ChangeEvent, FormEvent } from 'react'

import { router, useForm } from '@inertiajs/react'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputErrors, InputPassword, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { GuestLayout } from '@/layouts/guest'

export default function ResetPasswordPage({ token, email }: { token: string; email: string }) {
  const form = useForm({
    root: null,
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.patch('/reset-password', {
      onError: () => form.reset('password', 'password_confirmation'),
      onSuccess: () => {
        router.replace({
          url: '/',
        })

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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Reset password</CardTitle>
        <CardDescription>One more step, make your new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {form.errors.root && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{form.errors.root}</AlertDescription>
            </Alert>
          )}

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
      </CardContent>
    </Card>
  )
}

ResetPasswordPage.layout = [GuestLayout]
