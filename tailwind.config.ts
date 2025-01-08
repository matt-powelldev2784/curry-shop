import type { Config } from "tailwindcss";

import type { PluginAPI } from 'tailwindcss/types/config'

type TailwindUtilities = PluginAPI

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        twPink: '#d70567',
        twWhite: '#ffffff',
        twBlack: ' #0e1207',
        twLightGrey: '#F3F5F5',
        twDarkGrey: '#CFD7D7',
      },
      screens: {
        sm: '0px',
        md: '1000px',
        lg: '1200px',
      },
      fontFamily: {
        brandon: ['var(--font-brandon)'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
        extraBold: '900',
      },
      fontSize: {
        sm: '16px',
        base: '18px',
        lg: '20px',
        xl: '22px',
      },
    },
  },
  plugins: [
    ({ addUtilities }: TailwindUtilities) => {
      addUtilities({
        '.flexCol': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
        '.flexRow': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        '.clipPathCircle': {
          clipPath: 'circle(50% at 50% 50%)',
        },
      })
    },
  ],
} satisfies Config
