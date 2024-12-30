import type { User } from '@/types/user'
import type { ChangeEvent, FormEvent } from 'react'

import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'sonner'

import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Input, InputErrors, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { AppLayout } from '@/layouts/app'
import { SettingsLayout } from '@/pages/auth/settings/_components/layout'

export default function SettingsAccountPage() {
  const { user } = usePage().props.auth

  const defaults = useMemo(() => {
    return (user: User) => ({
      email: user.email,
      username: user.username,
    })
  }, [user])

  const form = useForm(defaults(user))

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.put('/settings/account', {
      onSuccess: ({
        props: {
          auth: { user },
        },
      }) => {
        form.setDefaults(defaults(user))
        form.setData(defaults(user))

        toast.success('Account successfully updated')
      },
    })
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof typeof form.data

    form.setData(name, e.target.value)
    form.clearErrors(name)
  }

  return (
    <form onSubmit={submitHandler} className="flex w-full flex-col gap-6 sm:max-w-sm">
      <InputWithLabel>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          value={form.data.email}
          onChange={inputHandler}
        />
        <InputErrors>{form.errors.email}</InputErrors>
      </InputWithLabel>

      <InputWithLabel>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          value={form.data.username}
          onChange={inputHandler}
        />
        <InputErrors>{form.errors.username}</InputErrors>
      </InputWithLabel>

      <Button type="submit" disabled={form.processing || !form.isDirty}>
        {form.processing ? <LoadingSpinner /> : 'Save'}
      </Button>
    </form>
  )
}

SettingsAccountPage.breadcrumb = {
  title: 'Account',
  url: '/settings/account',
}
SettingsAccountPage.layout = [AppLayout, SettingsLayout]
