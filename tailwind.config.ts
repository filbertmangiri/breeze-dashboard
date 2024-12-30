import type { Config } from 'tailwindcss'

import { basePreset } from './resources/js/styles/base-preset'

const config = {
  presets: [basePreset],
  content: ['./resources/views/**/*.blade.php', './resources/js/**/*.{js,ts,jsx,tsx,mdx}'],
} satisfies Config

export default config
