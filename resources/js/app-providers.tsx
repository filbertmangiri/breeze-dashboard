import { themes } from '@/constants/themes'
import { ThemeProvider } from '@/contexts/theme'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      name="mode"
      attribute="class"
      storageKey="ui-theme-mode"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <ThemeProvider
        name="color"
        attribute="data-ui-theme-color"
        storageKey="ui-theme-color"
        defaultTheme="neutral"
        themes={themes.color.map(({ name }) => name)}
        disableTransitionOnChange
        enableColorScheme={false}
        enableSystem={false}
      >
        <ThemeProvider
          name="radius"
          attribute="data-ui-theme-radius"
          storageKey="ui-theme-radius"
          defaultTheme="0.5"
          themes={themes.radius}
          disableTransitionOnChange
          enableColorScheme={false}
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </ThemeProvider>
    </ThemeProvider>
  )
}
