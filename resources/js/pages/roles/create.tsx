import type { Ability } from '@/types/bouncer'
import type { ChangeEvent, FormEvent } from 'react'

import { router, useForm } from '@inertiajs/react'
import slugify from 'slugify'
import { toast } from 'sonner'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input, InputErrors, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { AppLayout } from '@/layouts/app'
import { DashboardLayout } from '@/layouts/app/dashboard'
import { RolesLayout } from '@/pages/roles/_components/layout'

export default function CreateRolePage({ abilities }: { abilities: Ability[] }) {
  const form = useForm({
    name: '',
    title: '',
    abilities: [] as Ability['id'][],
  })

  useEffect(() => {
    form.setData(
      'name',
      slugify(form.data.title, {
        lower: true,
        strict: true,
      }),
    )
  }, [form.data.title])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.post('/roles', {
      onSuccess: () => {
        router.visit('/roles/' + form.data.name)

        toast.success('Role created successfully')
      },
    })
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof typeof form.data

    form.setData(name, e.target.value)
    form.clearErrors(name)
  }

  return (
    <form onSubmit={submitHandler} className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-6 sm:max-w-sm">
        <InputWithLabel>
          <Label htmlFor="title">Name</Label>
          <Input id="title" name="title" value={form.data.title} onChange={inputHandler} />
          <InputErrors>{form.errors.title}</InputErrors>
        </InputWithLabel>

        <InputWithLabel>
          <Label htmlFor="name">URL name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            value={form.data.name}
            onChange={inputHandler}
            disabled
          />
          <InputErrors>{form.errors.name}</InputErrors>
        </InputWithLabel>
      </div>

      <InputWithLabel className="gap-4">
        <Label asSpan>Abilities</Label>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {abilities.map((ability) => (
              <InputWithLabel key={ability.name} orientation="horizontal">
                <Checkbox
                  id="ability"
                  name="ability"
                  checked={form.data.abilities.includes(ability.id)}
                  onCheckedChange={(checked) => {
                    form.setData(
                      'abilities',
                      checked
                        ? [...form.data.abilities, ability.id]
                        : form.data.abilities.filter((id) => id !== ability.id),
                    )
                  }}
                />
                <Label htmlFor="ability">{ability.title}</Label>
              </InputWithLabel>
            ))}
          </div>

          <InputErrors>{form.errors.abilities}</InputErrors>
        </div>
      </InputWithLabel>

      <div className="flex w-full flex-col gap-6 sm:max-w-sm">
        <Button type="submit" disabled={form.processing || !form.isDirty}>
          {form.processing ? <LoadingSpinner /> : 'Create'}
        </Button>
      </div>
    </form>
  )
}

CreateRolePage.breadcrumb = {
  title: 'Create',
}

CreateRolePage.layout = [AppLayout, DashboardLayout, RolesLayout]
