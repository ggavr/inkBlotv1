import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink': {
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
        },
        'paper': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
        },
        'grey': {
          100: '#F4F4F4',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
        },
      },
      fontFamily: {
        'serif': ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
export default config

