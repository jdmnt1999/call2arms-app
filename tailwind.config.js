/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'github-dark': '#0d1117',
        'github-dark-secondary': '#161b22',
        'github-dark-border': '#30363d',
        'github-dark-text': '#c9d1d9',
        'github-dark-accent': '#58a6ff',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#58a6ff',
          secondary: '#30363d',
          accent: '#58a6ff',
          neutral: '#161b22',
          'base-100': '#0d1117',
          'base-content': '#c9d1d9',
        },
      },
    ],
    darkTheme: 'dark',
  },
};
