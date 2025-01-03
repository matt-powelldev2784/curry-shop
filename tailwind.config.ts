import type { Config } from "tailwindcss";

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
        twGrey: '#cfd7d7',
      },
      screens: {
        sm: '0px',
        md: '600px',
        lg: '1100px',
      },
    },
  },
  plugins: [],
} satisfies Config
