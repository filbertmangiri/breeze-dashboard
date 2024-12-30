import type { ChangeEvent, FormEvent } from 'react'

import { useForm } from '@inertiajs/react'
import { AlertCircle, Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, InputErrors, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { GuestLayout } from '@/layouts/guest'

export default function ForgotPasswordPage({ status }: { status?: string }) {
  const form = useForm({
    root: null,
    email: '',
  })

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.post('/forgot-password', {
      onSuccess: () => form.reset('email'),
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
        <CardTitle className="text-xl">Forgot password</CardTitle>
        <CardDescription>Enter your email to recieve a reset link.</CardDescription>
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

          {status && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Status</AlertTitle>
              <AlertDescription>{status}</AlertDescription>
            </Alert>
          )}

          <InputWithLabel>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@gmail.com"
              autoComplete="username"
              required
              value={form.data.email}
              onChange={inputHandler}
            />
            <InputErrors>{form.errors.email}</InputErrors>
          </InputWithLabel>

          <Button type="submit" disabled={form.processing || !form.isDirty}>
            {form.processing ? <LoadingSpinner /> : 'Send link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

ForgotPasswordPage.layout = [GuestLayout]
