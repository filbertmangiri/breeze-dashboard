import type { Config } from 'tailwindcss'

import tailwindcssAnimate from 'tailwindcss-animate'

import { layoutPlugin } from './plugins/layout'
import { shadcnPlugin } from './plugins/shadcn'
import { themePlugin } from './plugins/theme'

export const basePreset = {
  darkMode: ['class'],
  content: [],
  plugins: [tailwindcssAnimate, shadcnPlugin, layoutPlugin, themePlugin],
} satisfies Config
