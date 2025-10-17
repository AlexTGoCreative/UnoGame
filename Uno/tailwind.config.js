/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        'uno-red': '#E53935',
        'uno-blue': '#1E88E5',
        'uno-green': '#43A047',
        'uno-yellow': '#FDD835',
        'uno-dark': '#1a1a2e',
        'uno-darker': '#16213e',
      },
      fontFamily: {
        'uno': ['Fredoka', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.4)',
      }
    },
  },
}
