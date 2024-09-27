/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#3498db',
          icon: '#3498db',
          icon_background: '#ffffff',
          btn_primary: '#3498db',
          btn_primary_hover: '#2980b9',
          btn_danger: '#e74c3c',
          btn_danger_hover: '#c0392b',
          background_loading_screen: '#2c3e50',
          svg_loading_screen: '#3498db',
          badge_pet: '#2980b9',
          badge_raca: '#2980b9',
          badge_status_navbar_mobile: '#ffffff',
        },
      },
    },
  },
  safelist: [
    {
      pattern: /bg-custom-(icon_background|badge_status_navbar_mobile|primary|icon|btn_primary|btn_primary_hover|btn_danger|btn_danger_hover|background_loading_screen|badge_pet|badge_raca)/,
    }
  ],
  plugins: [
    require('flowbite/plugin')
  ],
}

