import plugin from 'tailwindcss/plugin'

import { colors } from '../theme/colors'
import { radius } from '../theme/radius'
import { sidebar } from '../theme/sidebar'

export const themePlugin = plugin(({ addBase }) => {
  addBase([...colors, sidebar, radius])
})
