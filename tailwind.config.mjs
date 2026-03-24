/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'ee-green-muted': '#80956d',
        'ee-green-bg': '#9caf88',
        'ee-green-logo': '#8f9988',
        'ee-terracotta': '#9f5434',
        'ee-gray-dark': '#545454',
        'ee-cyan-muted': '#45595a',
        'ee-brown-dark': '#232019',
        'ee-sand': '#c7a67a',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
        'dm-serif': ['"DM Serif Text"', 'serif'],
        'dm-serif-display': ['"DM Serif Display"', 'serif'],
      },
      fontSize: {
        'ee-title': ['55px', '1'],
        'ee-body': ['13px', '1.35'],
        'ee-subhead': ['19px', '1.2'],
        'ee-section': ['16px', '1.2'],
      },
      letterSpacing: {
        'poppins-spaced': '1.35px',
      }
    },
  },
  plugins: [],
}
