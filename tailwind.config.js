/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-crimson)',  'Georgia', 'serif'],
        sans:    ['var(--font-jost)',     'system-ui', 'sans-serif'],
      },
      // All colors reference CSS variables so dark mode works automatically
      colors: {
        bg:      'var(--bg)',
        bg2:     'var(--bg2)',
        card:    'var(--card)',
        ink:     'var(--ink)',
        ink2:    'var(--ink2)',
        ink3:    'var(--ink3)',
        ink4:    'var(--ink4)',
        accent:  'var(--accent)',
        accent2: 'var(--accent2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.65s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
