/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'ibmplex': ['IBM Plex Sans', 'sans-serif'],
      },
      fontFamily: {
        'sans': ['Montserrat'],
      },
      fontFamily: {
        'quicksand': ['Quicksand'],
      },
      fontFamily: {
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
      fontFamily: {
        'visuelt': ['VisueltPro', 'sans-serif'], // Add custom VisueltPro font family
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [],
};
