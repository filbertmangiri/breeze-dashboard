import { usePage } from '@inertiajs/react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NavUserAvatar, NavUserMenu } from '@/components/navigation/nav-user'

export function NavbarUser() {
  const { user } = usePage().props.auth

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-lg">
          <NavUserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>

      <NavUserMenu user={user} />
    </DropdownMenu>
  )
}
