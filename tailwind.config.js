/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: '#FAF8F4',
        travertine: '#EAE3D8',
        ink: '#292520',
        terracotta: {
          DEFAULT: '#AD6C4F',
          hover: '#95583E',
          light: '#F3E8E2',
        },
        sage: '#7D8879',
        walnut: '#76533F',
        muted: '#77716B',
        'subtle-border': '#DED8CF',
        'dark-stage': '#201D1A',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        interface: ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.045em',
        tight: '-0.025em',
      },
      maxWidth: {
        editorial: '1440px',
      },
    },
  },
  plugins: [],
};
