/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1226',
        secondary: '#D6CFC3',
        accent: '#C59F6C',
        accentSecondary: '#9CA3AF',
        background: '#F7F6F5',
        surface: '#FFFFFF',
        gray100: '#F7F6F5',
        gray200: '#EFEDEB',
        gray300: '#E1DDDA',
        gray500: '#BFC6CC',
        gray700: '#6B7280'
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        xl: '12px'
      }
    }
  },
  plugins: [],
}
