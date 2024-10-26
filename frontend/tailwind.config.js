/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensure this matches your file structure
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#5f6FFF"
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}

