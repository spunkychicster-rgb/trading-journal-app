/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#10b981',
        'danger': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6',
        'dark': '#1f2937',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
