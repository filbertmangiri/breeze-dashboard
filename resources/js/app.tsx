import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'

import { Toaster } from '@/components/ui/sonner'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { ScreenWidth } from '@/components/dev/screen-width'
import { ThemeCustomizer } from '@/components/theme-customizer'
import { AppProviders } from '@/app-providers'

const appName = (import.meta.env.VITE_APP_NAME as string) || 'Laravel'

await createInertiaApp({
  title: (title) => `${title}${title && ' - '}${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <AppProviders>
        <App {...props} />

        <Toaster />
        <ThemeCustomizer />
        <ConfirmationDialog />

        <ScreenWidth />
      </AppProviders>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})
