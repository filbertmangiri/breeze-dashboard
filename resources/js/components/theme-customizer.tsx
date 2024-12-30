import { CheckIcon } from 'lucide-react'
import { create } from 'zustand'

import * as React from 'react'

import { cn } from '@/utils/class'
import { themes } from '@/constants/themes'
import { useTheme } from '@/contexts/theme'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const header = {
  title: 'Preferences',
  description: 'Make changes to your theme here.',
}

export const useThemeCustomizer = create<{
  open: boolean
  setOpen: (open: boolean) => void
}>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))

export function ThemeCustomizer() {
  const { open, setOpen } = useThemeCustomizer()

  const isMobile = useIsMobile()

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{header.title}</DrawerTitle>
          <DrawerDescription>{header.description}</DrawerDescription>
        </DrawerHeader>

        <ThemeCustomizerMenu className="p-4 pt-0" />
      </DrawerContent>
    </Drawer>
  ) : (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{header.title}</SheetTitle>
          <SheetDescription>{header.description}</SheetDescription>
        </SheetHeader>

        <ThemeCustomizerMenu className="mt-6" />
      </SheetContent>
    </Sheet>
  )
}

function ThemeCustomizerMenu({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    theme: themeMode,
    resolvedTheme: resolvedThemeMode,
    setTheme: setThemeMode,
  } = useTheme('mode')
  const { theme: themeColor, setTheme: setThemeColor } = useTheme('color')
  const { theme: themeRadius, setTheme: setThemeRadius } = useTheme('radius')

  return (
    <div className={cn('space-y-4 md:space-y-6', className)} {...props}>
      <div className="space-y-1.5">
        <Label htmlFor="theme-mode">Mode</Label>

        <div id="theme-mode" className="grid grid-cols-3 gap-2">
          {themes.mode.map((mode) => {
            return (
              <Button
                key={mode.name}
                variant="outline"
                size="sm"
                className={cn(
                  'justify-start',
                  mode.name === themeMode && 'border-2 border-foreground',
                )}
                onClick={() => setThemeMode(mode.name)}
              >
                <mode.icon className="mr-1 flex h-5 w-5 shrink-0 -translate-x-1" />
                {mode.label}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="theme-color">Color</Label>

        <div id="theme-color" className="grid grid-cols-3 gap-2">
          {themes.color.map((color) => {
            const isActive = color.name === themeColor

            return (
              <Button
                key={color.name}
                variant="outline"
                size="sm"
                className={cn('justify-start', isActive && 'border-2 border-foreground')}
                onClick={() => setThemeColor(color.name)}
                style={
                  {
                    '--theme-primary': `hsl(${
                      color?.activeColor[resolvedThemeMode as 'dark' | 'light']
                    })`,
                  } as React.CSSProperties
                }
              >
                <span className="mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]">
                  {isActive && <CheckIcon className="h-3 w-3 text-white" />}
                </span>
                {color.label}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="theme-radius">Radius</Label>

        <div id="theme-radius" className="grid grid-cols-5 gap-2">
          {themes.radius.map((radius, index) => {
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={cn(radius === themeRadius && 'border-2 border-foreground')}
                onClick={() => setThemeRadius(radius)}
              >
                {radius}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
