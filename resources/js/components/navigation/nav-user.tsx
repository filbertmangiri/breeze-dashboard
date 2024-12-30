import type { User } from '@/types/user'

import { Link } from '@inertiajs/react'
import { LogOut, Palette, Settings } from 'lucide-react'

import { getNameInitial } from '@/utils/name'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useThemeCustomizer } from '@/components/theme-customizer'

export function NavUserMenu({ user }: { user: User }) {
  const isMobile = useIsMobile()

  const setThemeCustomizerOpen = useThemeCustomizer((state) => state.setOpen)

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? 'top' : 'bottom'}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeCustomizerOpen(true)}>
          <Palette />
          Appearance
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild variant="destructive">
        <Link href="/logout" method="delete" className="w-full">
          <LogOut />
          Logout
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}

export function NavUserAvatar({ user }: { user: User }) {
  const isMobile = useIsMobile()

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        {user.profile_picture && <AvatarImage src={user.profile_picture} alt={user.name} />}
        <AvatarFallback className="rounded-lg">{getNameInitial(user.name)}</AvatarFallback>
      </Avatar>

      {isMobile && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.name}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
      )}
    </>
  )
}
