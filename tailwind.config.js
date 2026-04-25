/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
          mono: ['IBM Plex Mono', 'monospace'],
        },
        colors: {
          ink: {
            50:  '#f4f4f0',
            100: '#e8e8e0',
            200: '#c8c8bc',
            300: '#a0a090',
            400: '#787868',
            500: '#545448',
            600: '#383830',
            700: '#282820',
            800: '#1a1a14',
            900: '#0e0e0a',
          },
          lime: {
            50:  '#f5ffe0',
            100: '#e8ffb3',
            200: '#d4f97a',
            300: '#baf043',
            400: '#a0e020',
            500: '#7ec400',
            600: '#5a9400',
            700: '#3f6800',
            800: '#274200',
            900: '#132100',
          },
          amber: {
            400: '#f59e0b',
            500: '#d97706',
          },
          red: {
            400: '#f87171',
            500: '#ef4444',
          },
          sky: {
            400: '#38bdf8',
            500: '#0ea5e9',
          }
        },
      },
    },
    plugins: [],
  }