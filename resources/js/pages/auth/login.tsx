import type { ChangeEvent, FormEvent } from 'react'

import { Link, useForm } from '@inertiajs/react'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input, InputErrors, InputPassword, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { GuestLayout } from '@/layouts/guest'

export default function LoginPage() {
  const form = useForm({
    root: null,
    email_or_username: '',
    password: '',
    remember: false,
  })

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.post('/login', {
      onError: () => form.reset('password'),
      onSuccess: () => toast.success("You're successfully logged in"),
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
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Enter your email or username below to login to your account.
        </CardDescription>
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
            <Label htmlFor="email_or_username">Email or username</Label>
            <Input
              id="email_or_username"
              name="email_or_username"
              placeholder="example@gmail.com"
              autoComplete="email username"
              required
              value={form.data.email_or_username}
              onChange={inputHandler}
            />
            <InputErrors>{form.errors.email_or_username}</InputErrors>
          </InputWithLabel>

          <InputWithLabel>
            <Label htmlFor="password">Password</Label>
            <InputPassword
              id="password"
              name="password"
              placeholder="********"
              autoComplete="current-password"
              required
              value={form.data.password}
              onChange={inputHandler}
            />
            <InputErrors>{form.errors.password}</InputErrors>
          </InputWithLabel>

          <div className="flex items-center justify-between">
            <InputWithLabel orientation="horizontal">
              <Checkbox
                id="remember"
                name="remember"
                checked={form.data.remember}
                onCheckedChange={(checked) => form.setData('remember', !!checked)}
              />
              <Label htmlFor="remember">Remember me</Label>
            </InputWithLabel>

            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline transition hover:opacity-75"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={form.processing || !form.isDirty}>
            {form.processing ? <LoadingSpinner /> : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

LoginPage.layout = [GuestLayout]
