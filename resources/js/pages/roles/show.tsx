import type { Ability, Role } from '@/types/bouncer'
import type { ChangeEvent, FormEvent } from 'react'

import { router, useForm } from '@inertiajs/react'
import { Check, ChevronsUpDown } from 'lucide-react'
import slugify from 'slugify'
import { toast } from 'sonner'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input, InputErrors, InputWithLabel } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LoadingSpinner } from '@/components/icons/loading-spinner'
import { AppLayout } from '@/layouts/app'
import { DashboardLayout } from '@/layouts/app/dashboard'
import { DeleteButton } from '@/pages/roles/_components/delete-button'
import { RolesLayout } from '@/pages/roles/_components/layout'

export default function ShowRolePage({
  role: selectedRole,
  roles,
  roleAbilities,
  abilities,
}: {
  role?: Role
  roles: Role[]
  roleAbilities: Ability[]
  abilities: Ability[]
}) {
  const [selectRoleOpen, setSelectRoleOpen] = useState(false)

  const defaults = useMemo(
    () => ({
      title: selectedRole?.title || '',
      name: selectedRole?.name || '',
      abilities: roleAbilities.map((roleAbility) => roleAbility.id),
    }),
    [roleAbilities],
  )

  useEffect(() => {
    form.setDefaults(defaults)
  }, [roleAbilities])

  const form = useForm(defaults)

  useEffect(() => {
    form.setData(
      'name',
      slugify(form.data.title, {
        lower: true,
        strict: true,
      }),
    )
  }, [form.data.title])

  const updateRoleHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedRole) return toast.error('Please select a role')

    form.patch(`/roles/${selectedRole.name}`, {
      onSuccess: () => {
        toast.success('Role updated successfully')
      },
    })
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof typeof form.data

    form.setData(name, e.target.value)
    form.clearErrors(name)
  }

  return (
    <div className="flex flex-col gap-6">
      <Popover open={selectRoleOpen} onOpenChange={setSelectRoleOpen}>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">Role</p>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-[200px] justify-between">
              {selectedRole ? <>{selectedRole.title}</> : <>Select role</>}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-[200px] p-0" align="start">
          <RoleList setOpen={setSelectRoleOpen} selectedRole={selectedRole} roles={roles} />
        </PopoverContent>
      </Popover>

      {selectedRole && (
        <form onSubmit={updateRoleHandler} className="flex w-full flex-col gap-6">
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
          </InputWithLabel>

          <div className="flex w-full flex-col gap-6 sm:max-w-sm">
            <Button type="submit" disabled={form.processing || !form.isDirty}>
              {form.processing ? <LoadingSpinner /> : 'Save'}
            </Button>

            {selectedRole.deletable && (
              <DeleteButton role={selectedRole}>Delete this role</DeleteButton>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

function RoleList({
  setOpen,
  selectedRole,
  roles,
}: {
  setOpen: (open: boolean) => void
  selectedRole?: Role
  roles: Role[]
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter role..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {roles.map((role) => (
            <CommandItem
              key={role.name}
              value={role.name}
              onSelect={(value) => {
                if (role.name !== selectedRole?.name) {
                  router.visit('/roles/' + value, {
                    replace: true,
                    preserveScroll: true,
                  })
                }

                setOpen(false)
              }}
            >
              {role.title}
              {selectedRole?.name === role.name && <Check className="ml-auto" />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

ShowRolePage.breadcrumb = {
  title: 'Manage',
}

ShowRolePage.layout = [AppLayout, DashboardLayout, RolesLayout]
