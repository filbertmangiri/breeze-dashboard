import * as React from 'react'

const ThemeModeContext = React.createContext<UseThemeProps | undefined>(undefined)
const ThemeColorContext = React.createContext<UseThemeProps | undefined>(undefined)
const ThemeRadiusContext = React.createContext<UseThemeProps | undefined>(undefined)

type ThemeName = 'mode' | 'color' | 'radius'

export const useTheme = (name: ThemeName) => {
  return React.use(getThemeContextByName(name)) ?? defaultContext
}

export const ThemeProvider = ({
  name,
  ...props
}: ThemeProviderProps & {
  name: ThemeName
}) => {
  const contextByName = getThemeContextByName(name)

  const context = React.useContext(contextByName)

  if (context) return <>{props.children}</>

  return <Theme Context={contextByName} {...props} />
}

const getThemeContextByName = (name: ThemeName) => {
  switch (name) {
    case 'mode':
      return ThemeModeContext

    case 'color':
      return ThemeColorContext
  }

  return ThemeRadiusContext
}

// next-themes@0.4.4

interface ValueObject {
  [themeName: string]: string
}

type DataAttribute = `data-${string}`

interface ScriptProps
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [dataAttribute: DataAttribute]: any
}

interface UseThemeProps {
  /** List of all available theme names */
  themes: string[]
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined
  /** Update the theme */
  setTheme: React.Dispatch<React.SetStateAction<string>>
  /** Active theme name */
  theme?: string | undefined
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string | undefined
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: 'dark' | 'light' | undefined
}

type Attribute = DataAttribute | 'class'

interface ThemeProviderProps extends React.PropsWithChildren {
  /** List of all available theme names */
  themes?: string[] | undefined
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean | undefined
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean | undefined
  /** Key used to store theme setting in localStorage */
  storageKey?: string | undefined
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string | undefined
  /** HTML attribute modified based on the active theme. Accepts `class`, `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.), or an array which could include both */
  attribute?: Attribute | Attribute[] | undefined
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject | undefined
  /** Nonce string to pass to the inline script and style elements for CSP headers */
  nonce?: string
  /** Props to pass the inline script */
  scriptProps?: ScriptProps
}

const colorSchemes = ['light', 'dark']
const MEDIA = '(prefers-color-scheme: dark)'
const isServer = typeof window === 'undefined'
const defaultContext: UseThemeProps = { setTheme: (_) => {}, themes: [] }

const defaultThemes = ['light', 'dark']

const Theme = ({
  Context,
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = defaultThemes,
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  children,
  nonce,
  scriptProps,
}: ThemeProviderProps & {
  Context: React.Context<UseThemeProps | undefined>
}) => {
  const [theme, setThemeState] = React.useState(() => getTheme(storageKey, defaultTheme))
  const [resolvedTheme, setResolvedTheme] = React.useState(() => getTheme(storageKey))
  const attrs = !value ? themes : Object.values(value)

  const applyTheme = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (theme: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let resolved = theme
      if (!resolved) return

      // If theme is system, resolve it before setting theme
      if (theme === 'system' && enableSystem) {
        resolved = getSystemTheme()
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const name = value ? value[resolved] : resolved
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null
      const d = document.documentElement

      const handleAttribute = (attr: Attribute) => {
        if (attr === 'class') {
          d.classList.remove(...attrs)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (name) d.classList.add(name)
        } else if (attr.startsWith('data-')) {
          if (name) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            d.setAttribute(attr, name)
          } else {
            d.removeAttribute(attr)
          }
        }
      }

      if (Array.isArray(attribute)) attribute.forEach(handleAttribute)
      else handleAttribute(attribute)

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
        const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        d.style.colorScheme = colorScheme
      }

      enable?.()
    },
    [nonce],
  )

  const setTheme = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const newTheme = typeof value === 'function' ? value(theme) : value
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setThemeState(newTheme)

      // Save to storage
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        localStorage.setItem(storageKey, newTheme)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Unsupported
      }
    },
    [theme],
  )

  const handleMediaQuery = React.useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system')
      }
    },
    [theme, forcedTheme],
  )

  // Always listen to System preference
  React.useEffect(() => {
    const media = window.matchMedia(MEDIA)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery])

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      if (!e.newValue) {
        setTheme(defaultTheme)
      } else {
        setThemeState(e.newValue) // Direct state update to avoid loops
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme])

  // Whenever theme or forcedTheme changes, apply it
  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])

  const providerValue = React.useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === 'system' ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, 'system'] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
  )

  return (
    <Context value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          themes,
          nonce,
          scriptProps,
        }}
      />

      {children}
    </Context>
  )
}

// eslint-disable-next-line react/display-name
const ThemeScript = React.memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    themes,
    nonce,
    scriptProps,
  }: Omit<ThemeProviderProps, 'children'> & { defaultTheme: string }) => {
    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      themes,
      value,
      enableSystem,
      enableColorScheme,
    ]).slice(1, -1)

    return (
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === 'undefined' ? nonce : ''}
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
      />
    )
  },
)

// Helpers
const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined
  let theme
  try {
    theme = localStorage.getItem(key) || undefined
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // Unsupported
  }
  return theme || fallback
}

const disableAnimation = (nonce?: string) => {
  const css = document.createElement('style')
  if (nonce) css.setAttribute('nonce', nonce)
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

const script = (
  attribute: string,
  storageKey: string,
  defaultTheme: string,
  forcedTheme: string,
  themes: string[],
  value: { [x: string]: string },
  enableSystem: boolean,
  enableColorScheme: boolean,
) => {
  const el = document.documentElement
  const systemThemes = ['light', 'dark']

  function updateDOM(theme: string) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute]

    attributes.forEach((attr) => {
      const isClass = attr === 'class'
      const classes = isClass && value ? themes.map((t) => value[t] || t) : themes
      if (isClass) {
        el.classList.remove(...classes)
        el.classList.add(value[theme] || theme)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        el.setAttribute(attr, theme)
      }
    })

    setColorScheme(theme)
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme
    }
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  if (forcedTheme) {
    updateDOM(forcedTheme)
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme
      const isSystem = enableSystem && themeName === 'system'
      const theme = isSystem ? getSystemTheme() : themeName
      updateDOM(theme)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      //
    }
  }
}
