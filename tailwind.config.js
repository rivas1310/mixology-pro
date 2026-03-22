/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta suave para confort visual
        cream: '#f7f6f3',
        'cream-50': '#fbfaf8',
        'cream-100': '#f2f0eb',
        beige: '#ddd6c9',
        'gold-light': '#c6b39a',
        gold: '#b39a7a',
        'gold-dark': '#8d7961',
        olive: '#7a7f63',
        'olive-light': '#92987a',
        'black-soft': '#2f312d',
        
        primary: {
          50: '#fbfaf8',
          100: '#f2f0eb',
          200: '#e4dfd6',
          300: '#cfc5b5',
          400: '#b39a7a',
          500: '#8d7961',
          600: '#7a7f63',
          700: '#5f645c',
          800: '#2f312d',
          900: '#242621',
        },
        accent: {
          50: '#f4f5ef',
          100: '#e7e9dd',
          200: '#d3d7c3',
          300: '#b8bea1',
          400: '#949d7f',
          500: '#7a7f63',
          600: '#656a52',
          700: '#535643',
          800: '#3f4233',
          900: '#2d3025',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'subtle-scale': 'subtleScale 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        subtleScale: {
          '0%': { transform: 'scale(0.98)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, rgba(251,250,248,1) 0%, rgba(242,240,235,0.82) 100%)',
        'gradient-gold': 'linear-gradient(135deg, rgba(221,214,201,0.26) 0%, rgba(179,154,122,0.14) 100%)',
      },
    },
  },
  plugins: [],
}


