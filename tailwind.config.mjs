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
        'serif-body': ['"Lora"', 'serif'],
        'sans-body': ['"Inter"', 'sans-serif'],
        'playfair': ['"Lora"', 'serif'], // Aliasing for compatibility or replacement
        'poppins': ['"Inter"', 'sans-serif'], // Redirecting old font to Inter for general legibility
        'brand-poppins': ['"Poppins"', 'sans-serif'], // New specific class for branding
        'dm-serif': ['"DM Serif Text"', 'serif'],
        'dm-serif-display': ['"DM Serif Display"', 'serif'],
      },
      fontSize: {
        'ee-title': ['55px', '1'],
        'ee-body': ['14px', '1.35'],
        'ee-subhead': ['19px', '1.2'],
        'ee-section': ['16px', '1.2'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      letterSpacing: {
        'poppins-spaced': '1.35px',
      }
    },
  },
  plugins: [],
}
