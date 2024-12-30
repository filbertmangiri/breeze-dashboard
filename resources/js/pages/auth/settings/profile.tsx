import type { User } from '@/types/user'
import type { ChangeEvent, FormEvent } from 'react'

import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'sonner'

import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Input, InputErrors, InputWithLabel } from '@/components/ui/input'
import { AvatarUpload } from '@/components/ui/input-avatar'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { AppLayout } from '@/layouts/app'
import { SettingsLayout } from '@/pages/auth/settings/_components/layout'

export default function SettingsProfilePage() {
  const { user } = usePage().props.auth

  const defaults = useMemo(() => {
    return (user: User) => ({
      name: user.name,
      gender: user.gender.value,
      description: user.description || '',
      profile_picture: user.profile_picture as string | Blob,
    })
  }, [user])

  const form = useForm(defaults(user))

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.post('/settings/profile', {
      onSuccess: ({
        props: {
          auth: { user },
        },
      }) => {
        form.setDefaults(defaults(user))
        form.setData(defaults(user))

        toast.success('Profile successfully updated')
      },
    })
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof typeof form.data

    form.setData(name, e.target.value)
    form.clearErrors(name)
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6 md:flex-row-reverse">
      <div className="flex-shrink-0">
        <InputWithLabel>
          <Label htmlFor="profile_picture">Profile picture</Label>
          <AvatarUpload
            id="profile_picture"
            className="size-48"
            current={form.data.profile_picture}
            set={(blob) => {
              form.setData('profile_picture', blob)
              form.clearErrors('profile_picture')
            }}
            reset={() => form.reset('profile_picture')}
          />
          <InputErrors>{form.errors.profile_picture}</InputErrors>
        </InputWithLabel>
      </div>

      <div className="flex flex-grow flex-col gap-6">
        <InputWithLabel>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={form.data.name}
            onChange={inputHandler}
          />
          <InputErrors>{form.errors.name}</InputErrors>
        </InputWithLabel>

        <InputWithLabel>
          <Label htmlFor="gender">Gender</Label>
          <Select
            name="gender"
            defaultValue={form.data.gender}
            onValueChange={(value) => form.setData('gender', value)}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <InputErrors>{form.errors.gender}</InputErrors>
        </InputWithLabel>

        <InputWithLabel>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            spellCheck={false}
            value={form.data.description}
            onChange={inputHandler}
          />
          <InputErrors>{form.errors.description}</InputErrors>
        </InputWithLabel>

        <Button type="submit" disabled={form.processing || !form.isDirty}>
          {form.processing ? <LoadingSpinner /> : 'Save'}
        </Button>
      </div>
    </form>
  )
}

SettingsProfilePage.breadcrumb = {
  title: 'Profile',
  url: '/settings/profile',
}
SettingsProfilePage.layout = [AppLayout, SettingsLayout]
