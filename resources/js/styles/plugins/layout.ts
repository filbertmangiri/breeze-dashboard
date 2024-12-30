import plugin from 'tailwindcss/plugin'

export const layoutPlugin = plugin(
  ({ addBase }) => {
    addBase({
      '*': {
        '@apply border-border': {},
      },
      html: {
        '@apply scroll-smooth': {},
        'font-synthesis-weight': 'none',
        'text-rendering': 'optimizeLegibility',
      },
      body: {
        '@apply font-inter bg-background text-foreground antialiased': {},
      },
    })
  },
  {
    corePlugins: {
      container: false,
    },
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans'],
        },
      },
    },
  },
)
