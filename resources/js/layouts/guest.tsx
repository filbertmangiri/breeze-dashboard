import type { ReactNode } from 'react'

import { Palette } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useThemeCustomizer } from '@/components/theme-customizer'

export function GuestLayout({ children }: { children: ReactNode }) {
  const setThemeCustomizer = useThemeCustomizer((state) => state.setOpen)

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {children}

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-0 mr-4 mt-4"
        onClick={() => setThemeCustomizer(true)}
      >
        <Palette />
      </Button>
    </div>
  )
}
